var contactsStore = {
    fields: ["firstName", "lastName", "email", "phone", "dateOfBirth"],
    data: [
        ["Bill", "Jones", "bill@test.com", "06-12345678", new Date(1956, 3, 11)],
        ["Jane", "Smith", "jane@test.com", "06-23456789", new Date(1982, 6, 24)],
        ["Jim", "Doe", "jim@test.com", "06-09876543", new Date(1995, 10, 6)],
        ["Amy", "Jackson", "amy@test.com", "06-87654321", new Date(1932, 12, 8)]
    ]
}

var emailsStore = {
    fields: ["name", "email", "subject", "received"],
    data: [
        [ "Lisa", "lisa@simpsons.com", "A new message", "01-08-2014 12:03" ],
        ["Bart", "bart@simpsons.com", "Please reply", "01-08-2014 12:02"],
        ["Homer", "home@simpsons.com", "Hello, how are you?", "01-08-2014 12:01"],
        ["Marge", "marge@simpsons.com", "Special offer!", "01-08-2014 12:00"]
    ],
    proxy: {
        type: "memory"
    }
}

Ext.application({
     name: "Zarafa.WebApp",
     launch: function () {
         Ext.create("Ext.container.Viewport", {
             layout: "border",
             items: [{
                 region: "north",
                 xtype: "toolbar",
                 cls: "main-menu",
                 items: [
                    { text: "Zarafa", iconCls: "ico-home" },
                    { text: "Mail", iconCls: "ico-inbox" },
                    { text: "Calendar", iconCls: "ico-cal" },
                    { text: "Contacts", iconCls: "ico-contact" },
                    { text: "Tasks", iconCls: "ico-task" },
                    { text: "Notes", iconCls: "ico-note" }
                 ]
             }, {
                 xtype: "treepanel",
                 title: "Mail",
                 region: "west",
                 width: 190,
                 split: true,
                 collapsible: true,
                 tbar: [{
                     text: "New...",
                     handler: "onClickButton",
                     menu: [
                         { text: "Email message", iconCls: "ico-mail" },
                         "-",
                         { text: "Folder", iconCls: "ico-folder" },
                         "-",
                         { text: "Appointment", iconCls: "ico-cal" },
                         { text: "Meeting request", iconCls: "ico-meeting" },
                         { text: "Contact", iconCls: "ico-contact" },
                         { text: "Distribution list", iconCls: "ico-distr" },
                         { text: "Task", iconCls: "ico-task" },
                         { text: "Sticky note", iconCls: "ico-note" }
                     ]
                 }, {
                     text: "Show all",
                     enableToggle: true
                 }, {
                     text: "Refresh", iconCls: "x-tbar-loading"
                 }],
                 useArrows: true,
                 rootVisible: false,
                 root: {
                     text: "Root",
                     expanded: true,
                     children: [
                         {
                             text: "Inbox - Michiel Crefcoeur",
                             iconCls: "ico-home",
                             expanded: true,
                             children: [
                                {
                                    text: "Calendar",
                                    leaf: true,
                                    iconCls: "ico-cal"
                                },
                                {
                                    text: "Contacts",
                                    leaf: true,
                                    iconCls: "ico-contact"
                                },
                                {
                                    text: "Deleted Items",
                                    leaf: true,
                                    iconCls: "ico-trash"
                                },
                                {
                                    text: "Drafts",
                                    leaf: true,
                                    iconCls: "ico-draft"
                                },
                                {
                                    text: "Inbox",
                                    iconCls: "ico-inbox",
                                    children: [
                                        { text: "Work" },
                                        { text: "Personal" }
                                    ]
                                },
                                {
                                    text: "Outbox",
                                    leaf: true,
                                    iconCls: "ico-outbox"
                                }
                             ]
                         },
                         {
                             text: "Public Folders",
                             expanded: true,
                             children: [
                                 {
                                     text: "Favorites",
                                     leaf: true,
                                     iconCls: "ico-fav"
                                 },
                                 {
                                     text: "Public Folders",
                                     children: [
                                         {
                                             text: "Contacts",
                                             iconCls: "ico-contact",
                                             leaf: true
                                         },
                                         {
                                             text: "Office",
                                             iconCls: "ico-contact",
                                             leaf: true
                                         }
                                     ]
                                 }
                             ]
                         }
                     ]
                 }
             },
                        {
                            xtype: "panel",
                            region: "east",
                            width: 180,
                            title: "Widgets",
                            items: [],
                            collapsible: true,
                            collapsed: true
                        }, {
                 region: "center",
                 xtype: "tabpanel",
                 items: [{
                     title: "Inbox",
                     iconCls: "ico-inbox",
                     layout: "border",
                     items: [
                        {
                            xtype: "grid",
                            width: "50%",
                            region: "center",
                            dockedItems: [{
                                xtype: "pagingtoolbar",
                                store: emailsStore,
                                dock: "top",
                                displayInfo: true
                            }, {
                                xtype: "toolbar",
                                dock: "top",
                                items: [{
                                    xtype: "textfield",
                                    placeHolder: "Search"
                                }, {
                                    xtype: "button",
                                    text: "Search"
                                }]
                            }],
                            store: emailsStore,
                            columns: [
                                { text: "Name", dataIndex: "name" },
                                { text: "Email", dataIndex: "email" },
                                { text: "Subject", dataIndex: "subject", flex: 1 },
                                { text: "Received", dataIndex: "received" }
                            ]
                        },
                        {
                            xtype: "panel",
                            region: "east",
                            width: "50%",
                            bodyPadding: 6,
                            iconCls: "ico-mail",
                            title: "A new message",
                            html: "Hello,<p>this is a new message.<p>Regards,<br>Lisa",
                            split: true
                        }
                     ]
                 }, {
                     xtype: "grid",
                     title: "Contacts",
                     iconCls: "ico-contact",
                     plugins: "rowediting",
                     dockedItems: [{
                         xtype: "pagingtoolbar",
                         store: contactsStore,
                         pageSize: 2,
                         dock: "top",
                         displayInfo: true
                     }],
                     store: contactsStore,
                     columns: {
                         defaults: {
                             width: 120,
                             editor: "textfield"
                         },
                         items: [
                             { text: "First name", dataIndex: "firstName" },
                             { text: "Last name", dataIndex: "lastName" },
                             { text: "Email", dataIndex: "email" },
                             { text: "Phone", dataIndex: "phone" },
                             { text: "Date of birth", dataIndex: "dateOfBirth", editor: "datefield" }
                         ]
                     }
                 }]
             }]
         });

     }
 });