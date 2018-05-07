"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
import datetime
import json
import os

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment
from xblockutils.studio_editable import StudioEditableXBlockMixin

from webob.response import Response

import subprocess

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
        scope=Scope.settings
    )
    lab_id = Integer(
        display_name='Lab ID',
        default=1
    )

    editable_fields = ('display_name', 'task_text', "lab_id")

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the InfoSecureXBlock, shown to students
        when viewing courses.
        """
        context = {
            "display_name": self.display_name,
            "task_text": self.task_text,
        }
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
        css_urls = ("static/css/infosecurexblock.css", )#css_context
        load_resources(js_urls, css_urls, fragment)
        fragment.initialize_js('InfoSecureXBlock')
        return fragment

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.handler
    def rect1(self, data, suffix=''):
        dir = os.path.dirname(os.path.realpath(__file__))
        #file = open(os.path.join(dir, ('static/js/src/rect{0}.json'.format(data.GET["lab_id"])))).read()
        file = open(os.path.join(dir, ('static/js/src/rect{0}.json'.format(data.params["lab_id"])))).read()
        return Response(body=file, charset='UTF-8',
                        content_type='text/plain')

    @XBlock.json_handler
    def check(self, data, *args):
        student_json = json.loads(data)
        student_answer = student_json["answer"]
        self.answer = data

        def multicheck(student_answer):

            ip = student_answer["ip"]
            d2 = student_answer["d"]
            N2 = student_answer["N"]
            answer0 = student_answer["e"]
            if ((ip == '') or (d2 == '') or (N2 == '') or (answer0 == '')):
                jsonData = json.dumps({"answer": "false"})  # ответ клиенту правльный ответ или нет

            else:
                d2 = int(d2)
                N2 = int(N2)
                answer0 = int(answer0)
                ip2 = ip
                answer2 = [int(r) for r in list(str(answer0))]
                dd = IsTheNumberSimple(d2)
                right = [14, 10, 18, 16, 14]
                p = 0
                j = 0
                k = len(str(answer0))
                if dd is True:
                    # if N2 == 10:
                    while j < k:
                        right[j] = right[j] ** d2 % N2
                        j += 1
                if str(right) == str(answer2):
                    if ip2 == "192.168.0.4":
                        jsonData = json.dumps({"answer": "true"})  # ответ клиенту правльный ответ или нет

                    else:
                        print('kek')
                else:
                    jsonData = json.dumps({"answer": "false"})  # ответ клиенту правльный ответ или нет


        def IsTheNumberSimple(n):
            if n < 2:
                return False
            if n == 2:
                return True
            l = 2
            for l in range(n):
                if n % 2 == 0:
                    return False
                else:
                    return True

        #https://github.com/MasterGowen/MultiEngineXBlock/blob/master/multiengine/multiengine.py
        #answer_opportunity
        #self.runtime.publish(self, 'grade', {
#                 'value': 0 -- 1,
#                 'max_value': 1,
# })



# TO-DO: change this to create the scenarios you'd like to see in the
# workbench while developing your XBlock.
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
