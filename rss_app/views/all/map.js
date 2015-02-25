function (doc) {
  emit(doc._id, { "title": doc.name, "file_name": doc.file });
}
