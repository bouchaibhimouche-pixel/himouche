var postTitle = new Array,
    postUrl = new Array,
    postPublished = new Array,
    postDate = new Array,
    postLabels = new Array,
    postRecent = new Array,
    sortBy = "titleasc",
    numberfeed = 0;

// استبدال pikisitemap بـ bobsitemap
function bobsitemap(t) {
    !function(){
        if("entry" in t.feed){
            var e = t.feed.entry.length;
            numberfeed = e;
            ii = 0;
            for(var s = 0; s < e; s++){
                for(var o, i = t.feed.entry[s], p = i.title.$t, l = i.published.$t.substring(0,10), r = 0; r < i.link.length; r++)
                    if("alternate" == i.link[r].rel){ o = i.link[r].href; break }
                
                var a = "";
                for(r = 0; r < i.link.length; r++)
                    if("enclosure" == i.link[r].rel){ a = i.link[r].href; break }
                
                var n = "";
                if("category" in i)
                    for(r = 0; r < i.category.length; r++){
                        var b = (n = i.category[r].term).lastIndexOf(";");
                        -1 != b && (n = n.substring(0,b));
                        postLabels[ii] = n;
                        postTitle[ii] = p;
                        postDate[ii] = l;
                        postUrl[ii] = o;
                        postPublished[ii] = a;
                        postRecent[ii] = s < 10;
                        ii += 1;
                    }
            }
        }
    }();
    sortPosts(sortBy = "titledesc");
    sortlabel();
    displayToc();
}

// باقي الدوال تبقى كما هي
function sortPosts(t){ ... }
function sortlabel(){ ... }
function sortPosts2(t,e){ ... }
function displayToc(){ ... }
