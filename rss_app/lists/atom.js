function(head, req) {

  var row = getRow();

  var header = function(data) {
    var f = <feed xmlns="http://www.w3.org/2005/Atom"/>;
    f.title = data.title;
    f.id = data.feed_id;
    f.link.@href = data.feed_link;
    f.link.@rel = "self";
    f.generator = "CouchApp on CouchDB";
    f.updated = rfc3339(data.updated);
    return f.toXMLString().replace(/\<\/feed\>/,'');
  };

  var f = function(n) {
      return n < 10 ? '0' + n : n;
  }

  var rfc3339 = function(date) {
    return date.getUTCFullYear()   + '-' +
      f(date.getUTCMonth() + 1) + '-' +
      f(date.getUTCDate())      + 'T' +
      f(date.getUTCHours())     + ':' +
      f(date.getUTCMinutes())   + ':' +
      f(date.getUTCSeconds())   + 'Z';
  };

  var entry = function(data) {
    var entry = <entry/>;
    entry.id = data.entry_id;
    entry.title = data.title;
    entry.content = data.content;
    entry.content.@type = (data.content_type || 'html');
    entry.updated = rfc3339(data.updated);
    entry.author = <author><name>{data.author}</name></author>;
    entry.link.@href = data.alternate;
    entry.link.@rel = "alternate";
    return entry;
  }


  var feedHeader = header({
    //updated : (row ? new Date(row.value.created_at) : new Date()),
    updated : new Date(),
    title : 'Insert Moin Archive',
    feed_id : 'some id',
    feed_link : 'https://tillkahlbrock.cloudant.com/ima/_design/ima/_list/atom/all',
  });

  send(feedHeader);

  if (row) {
    do {
      var feedEntry = entry({
        entry_id : row.key,
        title : row.value.title,
        content : '<a href="' + row.value.file_name + '">' + row.value.title  + '</a>',
        updated : new Date(),
        author : 'Insert Moin'
      });
      send(feedEntry);
    } while (row = getRow());
  }
  return "</feed>";
}
