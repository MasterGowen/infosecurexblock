"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
import json
import os

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String, JSONField
from xblock.fragment import Fragment
from xblockutils.studio_editable import StudioEditableXBlockMixin

from webob.response import Response

import copy

from .utils import (
    load_resource,
    render_template,
    load_resources,
)


class InfoSecureXBlock(StudioEditableXBlockMixin, XBlock):
    display_name = String(display_name='Display Name', default="infosecurexblock", scope=Scope.settings)
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

    editable_fields = ('display_name', 'task_text', "lab_id", "max_attempts", "weight")

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

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
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
                test = int(data["link"])
                right = 0.0
                if((test == 1) or (test == 5) or (test == 11) or (test==4) or (test ==8) or (test==9) or (test>=13)):
                    right=0.1 + right
                    return sum(float(right))
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
                'value': self.grade,
                'max_value': self.weight,
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
