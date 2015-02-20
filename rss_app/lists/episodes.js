function(head, req) {
  var row;
  while (row = getRow())
  {
    send('<p><a title="' + row.key + '" href="' + row.value + '">' + row.key + '</a></p>');
  }
}
