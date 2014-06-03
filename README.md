hexo-migrator-dropbox
=====================

## About ##

Hexo Dropbox migrator is a Hexo/Hexi plugins for migrating posts from Dropbox.

You can setup a hexo blogging system on any remote host you own, use your favorite markdown editor to write blog posts, save to Dropbox space. Then use this plugin to migrate the posts from Dropbox to your remote host.

## Install ##

### 1. Install plugins ###

Install hexo-migrator-dropbox at your hexo blog folder.  
```$ npm install git+https://github.com/kywk/hexo-migrator-dropbox.git --save```

### 2. Get your dropbox access token ###

Visit http://goo.gl/fvTIIq, and finish steps to get your access token. 
The token should looks like:

```
dropbox_migrator:
  app_key: skv92l3fnhakone
  app_secret: mu30g4zvjl82l083n
  oauth_token_secret: 32h9zvi39kdml9s
  oauth_token: jh8ykhos3hml9s0
  userid: 1234567
  source_dir: /Apps/Hexo-migrator 
```

### 3. Modify hexo _config.yml ###

Edit your hexo `_config.yml`, copy your dropbox access token and paste to `_config.yml`.  
Change `source_dir` to your Dropbox path of blog posts.

### 4. Import posts from Dropbox ###

Use following command to import posts from Dropbox to your Hexo blog system.  
```$ hexo migrate dropbox```

### 5. Done, Happy blogging ###

After the migrator downloads all posts, it's ready to generate and deploy your blog.
