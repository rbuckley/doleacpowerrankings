/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var assert = require('assert');
var randomstring = require('randomstring');
var shuffle = require('knuth-shuffle').knuthShuffle;
var PowerRanking = require('../api/power_ranking/power_ranking.model');
var LEAGUE_SIZE_MAX = 20;
var LEAGUE_PERIODS = 13;

/**
 * populateDB
 *
 * @param curPeriod - current period in the league, must be less than LEAGUE_SIZE
 * @param leagueSize - size of the league, must be less than LEAGUE_SIZE_MAX
 * @param leagueParticipation - number from 0 - 100 representing a percentage of how many
 *                              owners submit rankings
 * @return {league.league} - a JSON object ready to be inserted into the db
 * @return {league.owners} - an array of all the owner ids in the league
 */
function populateDB(curPeriod, leagueSize, leagueParticipation) {
   /* assertions for valid params */
   assert(0 <= curPeriod && curPeriod <= LEAGUE_PERIODS, 
          'curPeriod = ' + curPeriod + ' must be between 0 and ' + LEAGUE_PERIODS);
   assert(0 <= leagueSize && leagueSize <= LEAGUE_SIZE_MAX, 
          'leagueSize = ' + leagueSize + ' must be between 0 and ' + LEAGUE_SIZE_MAX);
   assert(0 <= leagueParticipation && leagueParticipation <= 100,
         'leagueParticipation is ' + leagueParticipation + ' must be between 0 and 100');

   var i;
   var j;
   var league = {};
   var leagueOwners = createLeague(leagueSize);
   league.league_id = randomstring.generate(15);
   league.periods = [LEAGUE_PERIODS];
   console.log('generating league ' + league.league_id);
   console.log('\twith ' + leagueSize + ' teams');
   console.log('\tin period ' + curPeriod);
   console.log('\twith ' + leagueParticipation +'% participation');
   /* loop over the number of periods and populate data */
   for (i = 0; i < curPeriod; i++) {
      console.log('entering rankings for period ' + i);
      var numOfSubmissions = leagueSize * (leagueParticipation/100);
      league.periods[i] = {};
      league.periods[i].period = i;
      league.periods[i].owners = []

      /* loop over the league size and create rankings for each owner */
      for (j = 0; j < leagueSize; j++) {
         /* determine if this team voted */
         if (Math.floor((Math.random() * leagueSize) > numOfSubmissions))
         {
            console.log('owner ' + leagueOwners[j] + ' did not vote!!');
            continue;
         }
   
        league.periods[i].owners[j] = {};
        league.periods[i].owners[j].id = leagueOwners[j];
        league.periods[i].owners[j].ranking = shuffle(leagueOwners.slice(0));
      }
   }
   return {'league': league, 'owners':leagueOwners};
}

/**
 * createLeague - assumes league size is already valid
 *
 * @param leagueSize - number of teams in league
 * @return leagueOwners - an array of leagueSize with random strings for owner ids
 */
function createLeague(leagueSize) {
   var leagueOwners = [];
   var i;
   for (i = 0; i < leagueSize; i++) {
      leagueOwners.push(randomstring.generate(15));
   }
   return leagueOwners;
}

/** populate a league of 12 teams with 100% participation and in week 6*/
var league = populateDB(6, 12, 90);
console.log(league.owners);
console.log(JSON.stringify(league.league, null, 3));
module.exports = populateDB;

