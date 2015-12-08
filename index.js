/**
 *
 */
var file = require('hexo-fs');
var dbox = require("dbox");


var DBM_MSGS = {
  "WRONG_KEY": "Your dropbox_migrator setting seems wrong, Please check _config.yml.",
  "EXPIRED_KEY": "Your dropbox access token had expired.",
  "GET_KEYS": "Please visit http://goo.gl/fvTIIq to get your oauth token keys."
};

var isEndWith = function(str, last){
  return str[str.length - 1] === last;
};

/**
 * dboxClient
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function dboxClient(args) {
  
  var config = this.config.dropbox_migrator;
  
  if (! config) {
    console.log(DBM_MSGS.WRONG_KEYS);
    console.log(DBM_MSGS.GET_KEYS);
    return;
  }

  config.source_dir += (isEndWith(config.source_dir, '/') ? '' : '/');

  var dbox_client = dbox.app({
      "app_key": config.app_key,
      "app_secret": config.app_secret,
      "root": "dropbox"}
  ).client({
      "oauth_token_secret": config.oauth_token_secret,
      "oauth_token": config.oauth_token,
      "uid": config.userid}
  );

  dbox_client.readdir(config.source_dir, function(status, filelist){
    if (status == 200){
        filelist.forEach(function (item) {
          dbox_client.get(item, function(status, reply, metadata) {
            if (status == 200){
              var fpath = metadata.path.replace(config.source_dir, "");
              console.log("downloading: " + fpath);
              file.writeFile("source/" + fpath, reply, function(err){
                if (err) console.log(err);  
              });
            }
          });
        });
    } else {
        console.log(DBM_MSGS.EXPIRED_KEY);
        console.log(DBM_MSGS.GET_KEYS);
    }
  });
}

hexo.extend.migrator.register("dropbox", dboxClient);
