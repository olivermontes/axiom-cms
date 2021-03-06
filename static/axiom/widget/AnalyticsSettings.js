/**
 * Axiom Content Management System (CMS)
 * Copyright (C) 2009 Axiom Software Inc.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA or contact Axiom Software Inc., 11480 Commerce Park Drive,
 * Third Floor, Reston, VA 20191 USA or email:
 * info@axiomsoftwareinc.com
 * */


/**
Copyright Axiom
Thomas Mayfield
*/

dojo.provide("axiom.widget.AnalyticsSettings");

dojo.require("dojo.lang.common");
dojo.require("dojo.html.*");
dojo.require("dojo.event.*");
dojo.require("dojo.widget.*");
dojo.require("dojo.io.*");
dojo.require("dojo.io.IframeIO");
dojo.require("axiom.widget.GeneralSettings");

dojo.widget.defineWidget(
	"axiom.widget.AnalyticsSettings",
	axiom.widget.GeneralSettings,
	function(){},
	{

		templatePath:new dojo.uri.dojoUri('../axiom/widget/resources/AnalyticsSettings.html'),
		save: function(){
			dojo.io.bind({url: 'save_analytics_info',
						  formNode: dojo.byId('analytics_settings'),
				      load: function(type, data, evt) {
						      if (data && data.success) {
							  axiom.showMessage("Settings saved.");
						      } else {
							  axiom.showMessage("There was a problem.");
						      }
						      this.widget.reload();
						  },
						  error: function(e,t){ axiom.showMessage(t.message); },
						  mimetype: 'text/json',
						  content_type: 'text/json',
						  method: "post",
						  widget: this
						 });
			this.content.innerHTML = '<div style="width:100%;text-align:center;padding:25px 0;">'
									 + 'Loading...<br/><img src="'+axiom.staticPath + '/axiom/images/ajax-loader.gif" '
									 + 'alt="Loading..." /></div>';
		},
		reload: function(){
			dojo.io.bind({ url:         'analytics_settings',
						   load:        this.loadSettings,
						   nocache: true,
						   widget:      this});
		},
		postCreate: function(){
			this.reload();
		}
	}
);
