var postTitle = [], postUrl = [], postDate = [], postLabels = [], postRecent = [], numberfeed = 0, sortBy = "titleasc";

function bobsitemap(feed) {
  if ("entry" in feed.feed) {
    var entries = feed.feed.entry;
    numberfeed = entries.length;
    var ii = 0;

    for (var i = 0; i < entries.length; i++) {
      var item = entries[i],
          title = item.title.$t,
          date = item.published.$t.substring(0, 10),
          url = "",
          label = "";

      for (var j = 0; j < item.link.length; j++) {
        if (item.link[j].rel == "alternate") {
          url = item.link[j].href;
          break;
        }
      }

      if ("category" in item) {
        for (var k = 0; k < item.category.length; k++) {
          label = item.category[k].term;
          var cut = label.lastIndexOf(";");
          if (cut != -1) label = label.substring(0, cut);
        }
      }

      postTitle[ii] = title;
      postDate[ii] = date;
      postUrl[ii] = url;
      postLabels[ii] = label;
      postRecent[ii] = i < 10;
      ii++;
    }
  }
  sortPosts("titledesc");
  sortlabel();
  displayToc();
}

function sortPosts(type) {
  function swap(x, y) {
    [postTitle[x], postTitle[y]] = [postTitle[y], postTitle[x]];
    [postDate[x], postDate[y]] = [postDate[y], postDate[x]];
    [postUrl[x], postUrl[y]] = [postUrl[y], postUrl[x]];
    [postLabels[x], postLabels[y]] = [postLabels[y], postLabels[x]];
    [postRecent[x], postRecent[y]] = [postRecent[y], postRecent[x]];
  }
  for (var i = 0; i < postTitle.length - 1; i++) {
    for (var j = i + 1; j < postTitle.length; j++) {
      if ((type == "titleasc" && postTitle[i] > postTitle[j]) ||
          (type == "titledesc" && postTitle[i] < postTitle[j]) ||
          (type == "dateoldest" && postDate[i] > postDate[j]) ||
          (type == "datenewest" && postDate[i] < postDate[j]) ||
          (type == "orderlabel" && postLabels[i] > postLabels[j])) {
        swap(i, j);
      }
    }
  }
}

function sortlabel() {
  sortPosts("orderlabel");
  var t = 0;
  for (var e = 0; e < postTitle.length;) {
    var temp1 = postLabels[e], firsti = t;
    do { t++; } while (postLabels[t] == temp1);
    e = t;
    sortPosts2(firsti, t);
    if (e > postTitle.length) break;
  }
}

function sortPosts2(start, end) {
  function swap(x, y) {
    [postTitle[x], postTitle[y]] = [postTitle[y], postTitle[x]];
    [postDate[x], postDate[y]] = [postDate[y], postDate[x]];
    [postUrl[x], postUrl[y]] = [postUrl[y], postUrl[x]];
    [postLabels[x], postLabels[y]] = [postLabels[y], postLabels[x]];
    [postRecent[x], postRecent[y]] = [postRecent[y], postRecent[x]];
  }
  for (var i = start; i < end - 1; i++) {
    for (var j = i + 1; j < end; j++) {
      if (postTitle[i] > postTitle[j]) swap(i, j);
    }
  }
}

function displayToc() {
  var t = 0;
  for (var e = 0; e < postTitle.length;) {
    var temp1 = postLabels[e];
    document.write('<div class="stiemap-posts"><h4>' + temp1 + '</h4><div class="stiemap-wrap">');
    var firsti = t;
    do {
      document.write("<p>");
      document.write('<a href="' + postUrl[t] + '">' + postTitle[t]);
      if (postRecent[t]) document.write(' - <strong><span>New!</span></strong>');
      document.write("</a></p>");
      t++;
    } while (postLabels[t] == temp1);
    e = t;
    document.write("</div></div>");
    sortPosts2(firsti, t);
    if (e > postTitle.length) break;
  }
}
