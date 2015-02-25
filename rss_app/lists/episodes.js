function(head, req) {
  var row;
  while (row = getRow())
  {
    send('<p><a title="' + row.value.title + '" href="' + row.value.file_name + '">' + row.value.title + ' (' + row.key + ')</a></p>');
  }
}
