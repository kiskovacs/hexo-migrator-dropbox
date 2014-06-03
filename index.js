/**
 *
 */
var file = hexo.util.file2;

/* */
var dbox = require("dbox")
var dbox_app;
var dbox_client;

var DBM_MSGS = {
  "WRONG_KEY": "Your dropbox_migrator setting seems wrong, Please check _config.yml.",
  "EXPIRED_KEY": "Your dropbox access token had expired.",
  "GET_KEYS": "Please visit http://goo.gl/fvTIIq to get your oauth token keys."
}

var isEndWith = function(str, last){
  return str[str.length - 1] === last;
};


/**
 * getFiles description
 * @param  {[type]} filelist [description]
 * @return {[type]}          [description]
 */
function getFiles(filelist) {
  filelist.forEach(function (item) {
    dbox_client.get(item.path, function(status, reply, metadata) {
      var fpath = metadata.path.replace(hexo.config.dropbox_migrator.source_dir, "");
      console.log("downloading: " + fpath);
      file.writeFile("source/" + fpath, reply, function(err){
      });
    });
  });
}


/**
 * dboxClient
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function dboxClient(args) {
  if (hexo.config.dropbox_migrator == null) {
    console.log(DBM_MSGS.WRONG_KEYS);
    console.log(DBM_MSGS.GET_KEYS);
    return;
  }

  hexo.config.dropbox_migrator.source_dir += (isEndWith(hexo.config.dropbox_migrator.source_dir, '/') ? '' : '/');

  dbox_app = dbox.app({
      "app_key": hexo.config.dropbox_migrator.app_key,
      "app_secret": hexo.config.dropbox_migrator.app_secret,
      "root": "dropbox"}
  );
  dbox_client = dbox_app.client({
      "oauth_token_secret": hexo.config.dropbox_migrator.oauth_token_secret,
      "oauth_token": hexo.config.dropbox_migrator.oauth_token,
      "uid": hexo.config.dropbox_migrator.userid}
  );

  dbox_client.search(hexo.config.dropbox_migrator.source_dir, "md", function(status, reply){
    switch (status) {
      case 200:
        getFiles(reply);
        break;
      case 401:
        console.log(DBM_MSGS.EXPIRED_KEY);
        console.log(DBM_MSGS.GET_KEYS);
        break;
    }
  });
}

hexo.extend.migrator.register("dropbox", dboxClient);
