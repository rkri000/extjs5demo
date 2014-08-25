/*
   ExtJS 5 Demo App for Zarafa.
   The main purpose of this app is getting accustomed to ExtJS.
   It shows a layout that's based on the Zarafa WebApp which uses ExtJS 3.
   The UI isn't yet fully functional.

   Important concepts that are currently not implemented yet in this demo app are:

   - event listeners
   - MVC / MVVM pattern
   - databinding for stores and tree
   - i18n & l10n

   In time, this app can evolve towards a version in which all these concepts are implemented.
*/

var contactsStore = {
    fields:
        ["firstName",   "lastName", "email",            "phone",        "dateOfBirth"],
    data: [
        ["Bill",        "Jones",    "bill@test.com",    "06-12345678",  new Date(1956, 3, 11)],
        ["Jane",        "Smith",    "jane@test.com",    "06-23456789",  new Date(1982, 6, 24)],
        ["Jim",         "Doe",      "jim@test.com",     "06-09876543",  new Date(1995, 10, 6)],
        ["Amy",         "Jackson",  "amy@test.com",     "06-87654321",  new Date(1932, 12, 8)]
    ]
};

var emailsStore = {
    fields:
        ["name",     "email",                "subject",             "received"],
    data: [
        ["Lisa",    "lisa@simpsons.com",    "A new message",        "01-08-2014 12:03"],
        ["Bart",    "bart@simpsons.com",    "Please reply",         "01-08-2014 12:02"],
        ["Homer",   "home@simpsons.com",    "Hello, how are you?",  "01-08-2014 12:01"],
        ["Marge",   "marge@simpsons.com",   "Special offer!",       "01-08-2014 12:00"]
    ]
};

var mainMenuItems = [
    { text: "Zarafa",   iconCls: "ico-home" },
    { text: "Mail",     iconCls: "ico-inbox" },
    { text: "Calendar", iconCls: "ico-cal" },
    { text: "Contacts", iconCls: "ico-contact" },
    { text: "Tasks",    iconCls: "ico-task" },
    { text: "Notes",    iconCls: "ico-note" }
];

var newMenuItems = [
    { text: "Email message",    iconCls: "ico-mail" },
    "-",
    { text: "Folder",           iconCls: "ico-folder" },
    "-",
    { text: "Appointment",      iconCls: "ico-cal" },
    { text: "Meeting request",  iconCls: "ico-meeting" },
    { text: "Contact",          iconCls: "ico-contact" },
    { text: "Distribution list",iconCls: "ico-distr" },
    { text: "Task",             iconCls: "ico-task" },
    { text: "Sticky note",      iconCls: "ico-note" }
];

var tree = {
    text: "Root",
    expanded: true,
    children: [
        {
            text: "Inbox - Michiel Crefcoeur",
            iconCls: "ico-home",
            expanded: true,
            children: [
                { text: "Calendar",     iconCls: "ico-cal",     leaf: true },
                { text: "Contacts",     iconCls: "ico-contact", leaf: true },
                { text: "Deleted Items",iconCls: "ico-trash",   leaf: true },
                { text: "Drafts",       iconCls: "ico-draft",   leaf: true },
                { text: "Inbox",        iconCls: "ico-inbox",   children: [
                    { text: "Work" },
                    { text: "Personal" }
                ] },
                { text: "Outbox",       iconCls: "ico-outbox",  leaf: true }
            ]
        },
        {
            text: "Public Folders", expanded: true, children: [
                { text: "Favorites",    iconCls: "ico-fav", leaf: true },
                { text: "Public Folders", children: [
                    { text: "Contacts", iconCls: "ico-contact", leaf: true },
                    { text: "Office",   iconCls: "ico-contact", leaf: true }
                ] }
            ]
        }
    ]
}

// the application lay-out
Ext.application({
     name: "Zarafa.WebApp",
     launch: function () {
         Ext.create("Ext.container.Viewport", {
             layout: "border",
             items: [{
                 region: "north",
                 xtype: "toolbar",
                 cls: "main-menu",
                 items: mainMenuItems
             },
             {
                 xtype: "treepanel",
                 title: "Mail",
                 region: "west",
                 width: 190,
                 split: true,
                 collapsible: true,
                 tbar: [
                    { text: "New...",   handler: "onClickButton", menu: newMenuItems },
                    { text: "Show all", enableToggle: true },
                    { text: "Refresh",  iconCls: "x-tbar-loading" }
                 ],
                 useArrows: true,
                 rootVisible: false,
                 root: tree
             },
             {
                xtype: "panel",
                region: "east",
                width: 180,
                title: "Widgets",
                items: [],
                collapsible: true,
                collapsed: true
             },
             {
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
                            dockedItems: [
                                {
                                    xtype: "pagingtoolbar",
                                    dock: "top",
                                    store: emailsStore,
                                    displayInfo: true
                                },
                                {
                                    xtype: "toolbar",
                                    dock: "top",
                                    items: [
                                        { xtype: "textfield" },
                                        { xtype: "button", text: "Search" }
                                    ]
                                }
                            ],
                            store: emailsStore,
                            columns: [
                                { text: "Name",     dataIndex: "name" },
                                { text: "Email",    dataIndex: "email" },
                                { text: "Subject",  dataIndex: "subject", flex: 1 },
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
                 },
                 {
                     xtype: "grid",
                     title: "Contacts",
                     iconCls: "ico-contact",
                     plugins: "rowediting",
                     dockedItems: [
                        {
                            xtype: "pagingtoolbar",
                            store: contactsStore,
                            pageSize: 2,
                            dock: "top",
                            displayInfo: true
                        }
                     ],
                     store: contactsStore,
                     columns: {
                         defaults: {
                             width: 120,
                             editor: "textfield"
                         },
                         items: [
                             { text: "First name",      dataIndex: "firstName" },
                             { text: "Last name",       dataIndex: "lastName" },
                             { text: "Email",           dataIndex: "email" },
                             { text: "Phone",           dataIndex: "phone" },
                             { text: "Date of birth",   dataIndex: "dateOfBirth", editor: "datefield" }
                         ]
                     }
                 }]
             }]
         });
     }
 });