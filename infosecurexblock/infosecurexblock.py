"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
import datetime
import json
import os

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment

from webob.response import Response

import subprocess

from .utils import (
    load_resource,
    render_template,
    load_resources,
)


class InfoSecureXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )
    display_name = String(default="infosecurexblock", scope=Scope.settings)

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
