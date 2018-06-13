"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
import json
import os
import math

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String, JSONField, Float
from xblock.fragment import Fragment
from xblock.scorable import ScorableXBlockMixin, Score
from xblockutils.studio_editable import StudioEditableXBlockMixin
from xblock.exceptions import JsonHandlerError
from xblock.validation import Validation

from webob.response import Response
from xblockutils.resources import ResourceLoader

import copy

from .utils import (
    load_resource,
    render_template,
    load_resources,
)

loader = ResourceLoader(__name__)


class InfoSecureXBlock(StudioEditableXBlockMixin, XBlock, ScorableXBlockMixin):
    display_name = String(
        display_name='Display Name',
        default="infosecurexblock",
        scope=Scope.settings
    )

    task_text = String(
        display_name='Task text',
        default="Task",
        multiline_editor=True,
        resettable_editor=False,
        scope=Scope.settings
    )

    weight = Integer(
        display_name=u"Maximum number of points",
        help=u"",
        default=60,
        scope=Scope.settings
    )

    lab_id = Integer(
        display_name='Lab ID',
        default=1,
        scope=Scope.settings
    )

    answer = JSONField(
        display_name=u"Ответ студента",
        default={},
        scope=Scope.user_state
    )

    max_attempts = Integer(
        display_name=u"Maximum number of attempts",
        help=u"",
        default=1,
        scope=Scope.settings
    )

    attempts = Integer(
        display_name=u"Количество сделанных попыток",
        default=0,
        scope=Scope.user_state
    )

    points = Integer(
        display_name=u"Количество баллов студента",
        default=0,
        scope=Scope.user_state
    )

    grade = Integer(
        display_name=u"Количество баллов студента",
        default=0,
        scope=Scope.user_state
    )

    lab_settings = JSONField(
        display_name='Lab settings',
        default=1,
        scope=Scope.settings
    )

    has_score = True

    editable_fields = ('display_name', 'task_text', "lab_id", "max_attempts", "weight", 'lab_settings')

    # editable_fields_advanced = ('lab_settings',)

    def get_score(self):
        return Score(self.points, self.weight)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        """
        The primary view of the InfoSecureXBlock, shown to students
        when viewing courses.
        """
        context = {
            "display_name": self.display_name,
            "task_text": self.task_text,
            "weight": self.weight,
            "max_attempts": self.max_attempts,
            "attempts": self.attempts,
            "points": self.points,

        }

        if answer_opportunity(self):
            context["answer_opportunity"] = True

        fragment = Fragment()
        fragment.add_content(
            render_template(
                "static/html/infosecurexblock.html",
                context
            )
        )
        js_urls = (
            "static/js/src/infosecurexblock.js",
            # "static/js/src/main.js",
        )
        css_context = dict(
            comp_icon=self.runtime.local_resource_url(self, "public/images/comp.svg"),
            transfer_icon=self.runtime.local_resource_url(self, "public/images/transfer.svg"),
            monitor_icon=self.runtime.local_resource_url(self, "public/images/monitor.svg"),
            server_3_icon=self.runtime.local_resource_url(self, "public/images/server-3.svg"),
            file_icon=self.runtime.local_resource_url(self, "public/images/file.svg"),
            wifi_icon=self.runtime.local_resource_url(self, "public/images/wifi.svg"),
        )
        css_urls = ("static/css/infosecurexblock.css",)  # css_context
        load_resources(js_urls, css_urls, fragment)
        fragment.initialize_js('InfoSecureXBlock')
        return fragment

    def studio_view(self, context):
        """
        Render a form for editing this XBlock
        """
        fragment = Fragment()
        context = {'fields': []}
        # Build a list of all the fields that can be edited:
        for field_name in self.editable_fields:
            field = self.fields[field_name]
            assert field.scope in (Scope.content, Scope.settings), (
                "Only Scope.content or Scope.settings fields can be used with "
                "StudioEditableXBlockMixin. Other scopes are for user-specific data and are "
                "not generally created/configured by content authors in Studio."
            )
            field_info = self._make_field_info(field_name, field)
            if field_info is not None:
                context["fields"].append(field_info)

        # for field_name in self.editable_fields_advanced:
        #     field = self.fields[field_name]
        #     field_info = self._make_field_info(field_name, field)
        #     if field_info is not None:
        #         context["fields_advanced"].append(field_info)

        fragment.content = loader.render_template('static/html/infosecurexblock_studio.html', context)
        fragment.add_javascript(loader.load_unicode('static/js/src/infosecurexblock_studio.js'))

        css_urls = (
            "static/css/infosecurexblock_studio.css",
        )
        load_resources([], css_urls, fragment)

        fragment.initialize_js('StudioEditableXBlockMixin')

        return fragment

    @XBlock.handler
    def rect1(self, data, suffix=''):
        dir = os.path.dirname(os.path.realpath(__file__))
        file = open(os.path.join(dir, ('static/js/src/lab_{0}_rect{1}.json'.format(
            self.lab_id,
            data.params["lab_id"]
        )))).read()
        return Response(body=file, charset='UTF-8',
                        content_type='text/plain')

    # elif(lab_id==2):
    # print('test')

    @XBlock.json_handler
    def checkLab(self, data, unused_suffix=''):
        return {'result': 'success' if answer_opportunity(self) else "fail",
                'lab_id': self.lab_id
                }

    @XBlock.json_handler
    def check(self, data, unused_suffix=''):
        self.answer = data

        def checkLabs(data):
            if self.lab_id == 1:
                ip, d, N, answer0 = data["ip"], int(data["d"]), int(data["N"]), int(data["e"])
                answer2 = [int(r) for r in list(str(answer0))]
                right = [14, 10, 18, 16, 14]
                if IsTheNumberSimple(d):
                    for j, k in enumerate(copy.deepcopy(right)):
                        right[j] = right[j] ** d % N
                if (str(right) == str(answer2)) & (ip == "192.168.0.4"):
                    return 1
                else:
                    return 0

            elif self.lab_id == 2:
                correctness_list = [data["answerBlockRedac"],
                                    data["answerBlockAdmin"],
                                    data["answerBlockUsers"],
                                    ]
                return sum(correctness_list) / float(len(correctness_list))

            elif self.lab_id == 3:
                correctness_list = [data["link1"],
                                    data["link2"],
                                    data["link3"],
                                    data["link4"],
                                    data["link5"],
                                    data["link6"],
                                    data["link7"],
                                    data["link8"],
                                    data["link9"],
                                    data["link10"],
                                    data["link11"],
                                    data["link12"],
                                    data["link13"],
                                    data["link14"],
                                    data["link15"],
                                    data["link16"],
                                    ]
                return sum(correctness_list) / float(len(correctness_list) - 6)

            elif self.lab_id == 4:
                pass

            elif self.lab_id == 5:
                answer0 = data["e"]
                key = data["key"]
                if (key == "key_id1" and answer0 == "0JjQvdGE0L7RgNC80LDRhtC40L7QvdC90LDRjyDQsdC10LfQvtC/0LDRgdC90L7RgdGC0Yw="):
                    return 1
                if (key == "key_id2" and answer0 == "0JjQvdGE0L7RgNC80LDRgtC40LrQsA=="):
                    return 1
                if (key == "key_id3" and answer0 == "0KjQuNGE0YDQvtCy0LDQvdC40LU="):
                    return 1
                if (str(key) == "key_id4" and answer0 == "0JrQuNCx0LXRgNCx0LXQt9C+0L/QsNGB0L3QvtGB0YLRjA=="):
                    return 1
                else:
                    return 0

        def IsTheNumberSimple(n):
            if n < 2:
                return False
            if n == 2:
                return True
            for l in range(2, n):
                if n % 2 == 0:
                    return False
                else:
                    return True

        if answer_opportunity(self):
            grade = checkLabs(data)
            self.grade = grade
            self.points = grade * self.weight

            self.runtime.publish(self, 'grade', {
                'value': self.points,
                'max_value': self.weight,
                'only_if_higher': None,
            })
            self.attempts += 1
            response = {'result': 'success',
                        'correct': grade,
                        'weight': self.weight,
                        "max_attempts": self.max_attempts,
                        "attempts": self.attempts,
                        "points": self.points,
                        }

        else:
            response = {'result': 'fail',
                        "max_attempts": self.max_attempts,
                        "attempts": self.attempts
                        }
        return response


@staticmethod
def workbench_scenarios():
    """A canned scenario for display in the workbench."""
    return [
        ("InfoSecureXBlock",
         """<infosecurexblock/>
         """),
        ("Multiple InfoSecureXBlock",
         """<vertical_demo>
            <infosecurexblock/>
            <infosecurexblock/>
            <infosecurexblock/>
            </vertical_demo>
         """),
    ]


def answer_opportunity(self):
    """
    Возможность ответа (если количество сделанное попыток меньше заданного).
    """
    if self.max_attempts <= self.attempts and self.max_attempts != 0:
        return False
    else:
        return True
