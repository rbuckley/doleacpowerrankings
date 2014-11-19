module.exports = function(grunt){
   return {
      cbs_token: {
         options: {
            url: 'http://api.cbssports.com/general/oauth/generate_token',
            method: 'POST',
            form: {
               app_id: '13938',
               app_secret: '02756529fbc7445b39cf2cadbf3cdbdf4837d8afb9a68efab6',
               user_id: grunt.option('user_id'),
               league_id: grunt.option('league_id'),
               sport: 'football',
               response_format: 'JSON',
            },
            callback: function (error, response, body) {
               var dest = 'client/test/token.json';
               var json = JSON.parse(body);
               var now = Date.now();
               var token_info = {
                  expires: grunt.template.date(now + 3*24*60*60*1000),
                  user_id: grunt.option('user_id'),
                  league_id: grunt.option('league_id'),
                  access_token: json.body.access_token,
               };
               grunt.file.write(dest, JSON.stringify(token_info, null, 2));
            }
         },
      }
   };
};
