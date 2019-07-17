// Init global editor variable
let editor;

$(document).ready(() => {
  editor = new $.fn.dataTable.Editor( {
    table: "#table-example",
    fields: [ {
            label: "Name:",
            name: "name"
        }, {
            label: "Position:",
            name: "position"
        }, {
            label: "Office:",
            name: "office"
        }, {
            label: "Age:",
            name: "age"
        }, {
            label: "Start date:",
            name: "start_date",
            type: "datetime"
        }, {
            label: "Salary:",
            name: "salary"
        }
    ]
  } );

  $('#table-example').on('click', 'tbody td:not(:first-child)', function (e) {
    editor.inline(this);
  });

  editor.on("onSubmitComplete", function(e, json, data, action) {
    console.log(action);
    console.log(data);
    if (action === "edit") {
      alert(`Bạn vừa edit thành công row có id là ${data.DT_RowId}`);
    }
    // Do something whatever you want...
  });

  $('#table-example').DataTable( {
    dom: "Bfrtip", // using to show buttons handle data
    order: [[ 1, 'asc' ]], // asc sort by colum 1
    columns: [
      {
        data: null,
        defaultContent: '',
        className: 'select-checkbox',
        orderable: false
      },
      { data: "name" },
      { data: "position" },
      { data: "office" },
      { data: "age" },
      { data: "start_date" },
      { data: "salary", render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) }
    ],
    select: {
      style: 'os',
      selector: 'td:first-child'
    },
    buttons: [
        { extend: "create", editor: editor },
        { extend: "edit",   editor: editor },
        { extend: "remove", editor: editor }
    ]
  });
});