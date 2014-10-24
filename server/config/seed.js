/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var PowerRanking = require('../api/power_ranking/power_ranking.model');

console.log('seeeeeeed');
PowerRanking.find({}).remove(function() {
   PowerRanking.create({
      league_id : 'jdggr_827',
      periods: [{
         period: 1,
         owners: [
            {id: '1234',
            ranking: [
               {owner_id: '321'},
               {owner_id: '123'},
               {owner_id: '987'}
            ]},
            {id: '9876',
            ranking: [
               {owner_id: '123'},
               {owner_id: '987'},
               {owner_id: '321'}
            ]}
         ]
      }]
   },{
      league_id : 'dht_2784',
      periods: [{
         period: 1,
         owners: [{
            id: '1234',
            ranking: [
               {owner_id: '321'},
               {owner_id: '123'},
               {owner_id: '987'}
            ]
         }]
      }]
   });
});
