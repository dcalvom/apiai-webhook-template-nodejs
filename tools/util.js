'use strict';

var flatten  = require('./flatten.js'),
  similarity = require('./similarity.js');


// Utility function to sort the profiles based on distance
var profileSort = function (p1, p2) {
  return p2.distance-p1.distance;
};

var careers = [ 
                {name: 'Ingeniería de Software', profile:'{"word_count":422,"processed_language":"en","personality":[{"trait_id":"big5_openness","name":"Openness","category":"personality","percentile":0.8713393110582338,"children":[{"trait_id":"facet_adventurousness","name":"Adventurousness","category":"personality","percentile":0.9389010384630668},{"trait_id":"facet_artistic_interests","name":"Artistic interests","category":"personality","percentile":0.6673127043319355},{"trait_id":"facet_emotionality","name":"Emotionality","category":"personality","percentile":0.24201656537258354},{"trait_id":"facet_imagination","name":"Imagination","category":"personality","percentile":0.7443198409594914},{"trait_id":"facet_intellect","name":"Intellect","category":"personality","percentile":0.9720274163801289},{"trait_id":"facet_liberalism","name":"Authority-challenging","category":"personality","percentile":0.9889354628892939}]},{"trait_id":"big5_conscientiousness","name":"Conscientiousness","category":"personality","percentile":0.5096480578312469,"children":[{"trait_id":"facet_achievement_striving","name":"Achievement striving","category":"personality","percentile":0.8365153905215251},{"trait_id":"facet_cautiousness","name":"Cautiousness","category":"personality","percentile":0.6090687820843721},{"trait_id":"facet_dutifulness","name":"Dutifulness","category":"personality","percentile":0.5489652302360689},{"trait_id":"facet_orderliness","name":"Orderliness","category":"personality","percentile":0.09680596073348773},{"trait_id":"facet_self_discipline","name":"Self-discipline","category":"personality","percentile":0.45848020622933666},{"trait_id":"facet_self_efficacy","name":"Self-efficacy","category":"personality","percentile":0.6338052041931042}]},{"trait_id":"big5_extraversion","name":"Extraversion","category":"personality","percentile":0.30777569658006326,"children":[{"trait_id":"facet_activity_level","name":"Activity level","category":"personality","percentile":0.9303573280726287},{"trait_id":"facet_assertiveness","name":"Assertiveness","category":"personality","percentile":0.7782472616299609},{"trait_id":"facet_cheerfulness","name":"Cheerfulness","category":"personality","percentile":0.241066816448471},{"trait_id":"facet_excitement_seeking","name":"Excitement-seeking","category":"personality","percentile":0.43746001079799424},{"trait_id":"facet_friendliness","name":"Outgoing","category":"personality","percentile":0.23193894922506497},{"trait_id":"facet_gregariousness","name":"Gregariousness","category":"personality","percentile":0.1337608602388891}]},{"trait_id":"big5_agreeableness","name":"Agreeableness","category":"personality","percentile":0.08843473394950269,"children":[{"trait_id":"facet_altruism","name":"Altruism","category":"personality","percentile":0.5309736868845546},{"trait_id":"facet_cooperation","name":"Cooperation","category":"personality","percentile":0.7099342883793122},{"trait_id":"facet_modesty","name":"Modesty","category":"personality","percentile":0.20242356014310814},{"trait_id":"facet_morality","name":"Uncompromising","category":"personality","percentile":0.40634288692081},{"trait_id":"facet_sympathy","name":"Sympathy","category":"personality","percentile":0.687576509966165},{"trait_id":"facet_trust","name":"Trust","category":"personality","percentile":0.9362924703937341}]},{"trait_id":"big5_neuroticism","name":"Emotional range","category":"personality","percentile":0.6116462736089076,"children":[{"trait_id":"facet_anger","name":"Fiery","category":"personality","percentile":0.2571325368228414},{"trait_id":"facet_anxiety","name":"Prone to worry","category":"personality","percentile":0.413627588283212},{"trait_id":"facet_depression","name":"Melancholy","category":"personality","percentile":0.7661245685402768},{"trait_id":"facet_immoderation","name":"Immoderation","category":"personality","percentile":0.39373153716341064},{"trait_id":"facet_self_consciousness","name":"Self-consciousness","category":"personality","percentile":0.7147874198360288},{"trait_id":"facet_vulnerability","name":"Susceptible to stress","category":"personality","percentile":0.5465205665374596}]}],"needs":[{"trait_id":"need_challenge","name":"Challenge","category":"needs","percentile":0.5595586912756778},{"trait_id":"need_closeness","name":"Closeness","category":"needs","percentile":0.14254291767365557},{"trait_id":"need_curiosity","name":"Curiosity","category":"needs","percentile":0.8592356585205122},{"trait_id":"need_excitement","name":"Excitement","category":"needs","percentile":0.2710587210939293},{"trait_id":"need_harmony","name":"Harmony","category":"needs","percentile":0.09865769988860837},{"trait_id":"need_ideal","name":"Ideal","category":"needs","percentile":0.4004639553768975},{"trait_id":"need_liberty","name":"Liberty","category":"needs","percentile":0.5672890788598539},{"trait_id":"need_love","name":"Love","category":"needs","percentile":0.3616327851038188},{"trait_id":"need_practicality","name":"Practicality","category":"needs","percentile":0.38977598581728895},{"trait_id":"need_self_expression","name":"Self-expression","category":"needs","percentile":0.17703338040178604},{"trait_id":"need_stability","name":"Stability","category":"needs","percentile":0.40070356637609617},{"trait_id":"need_structure","name":"Structure","category":"needs","percentile":0.8141984960680901}],"values":[{"trait_id":"value_conservation","name":"Conservation","category":"values","percentile":0.081018293271546},{"trait_id":"value_openness_to_change","name":"Openness to change","category":"values","percentile":0.6786233269489185},{"trait_id":"value_hedonism","name":"Hedonism","category":"values","percentile":0.04549735831565954},{"trait_id":"value_self_enhancement","name":"Self-enhancement","category":"values","percentile":0.25851296511241956},{"trait_id":"value_self_transcendence","name":"Self-transcendence","category":"values","percentile":0.5234253353666548}],"warnings":[]}'},
                {name: 'Ciencias de la Computación', profile:'{"word_count":562,"processed_language":"en","personality":[{"trait_id":"big5_openness","name":"Openness","category":"personality","percentile":0.7957257103877196,"children":[{"trait_id":"facet_adventurousness","name":"Adventurousness","category":"personality","percentile":0.777557008910819},{"trait_id":"facet_artistic_interests","name":"Artistic interests","category":"personality","percentile":0.7280756457415929},{"trait_id":"facet_emotionality","name":"Emotionality","category":"personality","percentile":0.3997355184123121},{"trait_id":"facet_imagination","name":"Imagination","category":"personality","percentile":0.5893006516813344},{"trait_id":"facet_intellect","name":"Intellect","category":"personality","percentile":0.984835302166448},{"trait_id":"facet_liberalism","name":"Authority-challenging","category":"personality","percentile":0.9908089586229566}]},{"trait_id":"big5_conscientiousness","name":"Conscientiousness","category":"personality","percentile":0.5404457842024574,"children":[{"trait_id":"facet_achievement_striving","name":"Achievement striving","category":"personality","percentile":0.757846149493062},{"trait_id":"facet_cautiousness","name":"Cautiousness","category":"personality","percentile":0.7964801224906798},{"trait_id":"facet_dutifulness","name":"Dutifulness","category":"personality","percentile":0.6201495195141831},{"trait_id":"facet_orderliness","name":"Orderliness","category":"personality","percentile":0.09302725973051253},{"trait_id":"facet_self_discipline","name":"Self-discipline","category":"personality","percentile":0.3280129651122378},{"trait_id":"facet_self_efficacy","name":"Self-efficacy","category":"personality","percentile":0.6203624762330984}]},{"trait_id":"big5_extraversion","name":"Extraversion","category":"personality","percentile":0.15597063040391543,"children":[{"trait_id":"facet_activity_level","name":"Activity level","category":"personality","percentile":0.8786391696771698},{"trait_id":"facet_assertiveness","name":"Assertiveness","category":"personality","percentile":0.6899525542428053},{"trait_id":"facet_cheerfulness","name":"Cheerfulness","category":"personality","percentile":0.09790875164362314},{"trait_id":"facet_excitement_seeking","name":"Excitement-seeking","category":"personality","percentile":0.16211663696369125},{"trait_id":"facet_friendliness","name":"Outgoing","category":"personality","percentile":0.25940424553961033},{"trait_id":"facet_gregariousness","name":"Gregariousness","category":"personality","percentile":0.04427674721168644}]},{"trait_id":"big5_agreeableness","name":"Agreeableness","category":"personality","percentile":0.06889641066029224,"children":[{"trait_id":"facet_altruism","name":"Altruism","category":"personality","percentile":0.540938086076301},{"trait_id":"facet_cooperation","name":"Cooperation","category":"personality","percentile":0.628487724493778},{"trait_id":"facet_modesty","name":"Modesty","category":"personality","percentile":0.21378783396643344},{"trait_id":"facet_morality","name":"Uncompromising","category":"personality","percentile":0.38333008293972226},{"trait_id":"facet_sympathy","name":"Sympathy","category":"personality","percentile":0.8051534066708332},{"trait_id":"facet_trust","name":"Trust","category":"personality","percentile":0.867406822390387}]},{"trait_id":"big5_neuroticism","name":"Emotional range","category":"personality","percentile":0.6503534799809003,"children":[{"trait_id":"facet_anger","name":"Fiery","category":"personality","percentile":0.3635005574224439},{"trait_id":"facet_anxiety","name":"Prone to worry","category":"personality","percentile":0.5708795099835258},{"trait_id":"facet_depression","name":"Melancholy","category":"personality","percentile":0.7469320004232606},{"trait_id":"facet_immoderation","name":"Immoderation","category":"personality","percentile":0.43880557559954614},{"trait_id":"facet_self_consciousness","name":"Self-consciousness","category":"personality","percentile":0.7947425257351214},{"trait_id":"facet_vulnerability","name":"Susceptible to stress","category":"personality","percentile":0.6428424766049425}]}],"needs":[{"trait_id":"need_challenge","name":"Challenge","category":"needs","percentile":0.3086200313765295},{"trait_id":"need_closeness","name":"Closeness","category":"needs","percentile":0.08599985142943693},{"trait_id":"need_curiosity","name":"Curiosity","category":"needs","percentile":0.7231254750097802},{"trait_id":"need_excitement","name":"Excitement","category":"needs","percentile":0.054528163734906},{"trait_id":"need_harmony","name":"Harmony","category":"needs","percentile":0.07031419641595117},{"trait_id":"need_ideal","name":"Ideal","category":"needs","percentile":0.13655885856047445},{"trait_id":"need_liberty","name":"Liberty","category":"needs","percentile":0.11947557185975612},{"trait_id":"need_love","name":"Love","category":"needs","percentile":0.08478978643288926},{"trait_id":"need_practicality","name":"Practicality","category":"needs","percentile":0.054695897491472856},{"trait_id":"need_self_expression","name":"Self-expression","category":"needs","percentile":0.09447369038584698},{"trait_id":"need_stability","name":"Stability","category":"needs","percentile":0.20699330702713845},{"trait_id":"need_structure","name":"Structure","category":"needs","percentile":0.7213095662804623}],"values":[{"trait_id":"value_conservation","name":"Conservation","category":"values","percentile":0.06513760760260733},{"trait_id":"value_openness_to_change","name":"Openness to change","category":"values","percentile":0.33654324241581723},{"trait_id":"value_hedonism","name":"Hedonism","category":"values","percentile":0.01877015169569355},{"trait_id":"value_self_enhancement","name":"Self-enhancement","category":"values","percentile":0.09760805653668819},{"trait_id":"value_self_transcendence","name":"Self-transcendence","category":"values","percentile":0.43945942108860514}],"warnings":[]}'},
                {name: 'Ingeniería de Tecnologías de la Información', profile:'{"word_count":423,"processed_language":"en","personality":[{"trait_id":"big5_openness","name":"Openness","category":"personality","percentile":0.9030209794853528,"children":[{"trait_id":"facet_adventurousness","name":"Adventurousness","category":"personality","percentile":0.9048538904380565},{"trait_id":"facet_artistic_interests","name":"Artistic interests","category":"personality","percentile":0.6089139743332938},{"trait_id":"facet_emotionality","name":"Emotionality","category":"personality","percentile":0.22553877828463953},{"trait_id":"facet_imagination","name":"Imagination","category":"personality","percentile":0.5997815542263274},{"trait_id":"facet_intellect","name":"Intellect","category":"personality","percentile":0.9839313999800043},{"trait_id":"facet_liberalism","name":"Authority-challenging","category":"personality","percentile":0.9852521051940057}]},{"trait_id":"big5_conscientiousness","name":"Conscientiousness","category":"personality","percentile":0.498810090601861,"children":[{"trait_id":"facet_achievement_striving","name":"Achievement striving","category":"personality","percentile":0.7450903736818864},{"trait_id":"facet_cautiousness","name":"Cautiousness","category":"personality","percentile":0.7792854938865845},{"trait_id":"facet_dutifulness","name":"Dutifulness","category":"personality","percentile":0.4143063968224762},{"trait_id":"facet_orderliness","name":"Orderliness","category":"personality","percentile":0.14529564827358388},{"trait_id":"facet_self_discipline","name":"Self-discipline","category":"personality","percentile":0.5309857163966583},{"trait_id":"facet_self_efficacy","name":"Self-efficacy","category":"personality","percentile":0.488487110792141}]},{"trait_id":"big5_extraversion","name":"Extraversion","category":"personality","percentile":0.44123007924002483,"children":[{"trait_id":"facet_activity_level","name":"Activity level","category":"personality","percentile":0.9255687920855613},{"trait_id":"facet_assertiveness","name":"Assertiveness","category":"personality","percentile":0.6651026796887047},{"trait_id":"facet_cheerfulness","name":"Cheerfulness","category":"personality","percentile":0.18725447026109232},{"trait_id":"facet_excitement_seeking","name":"Excitement-seeking","category":"personality","percentile":0.31586449237587555},{"trait_id":"facet_friendliness","name":"Outgoing","category":"personality","percentile":0.11228485174135366},{"trait_id":"facet_gregariousness","name":"Gregariousness","category":"personality","percentile":0.12342434743193617}]},{"trait_id":"big5_agreeableness","name":"Agreeableness","category":"personality","percentile":0.07669009404657803,"children":[{"trait_id":"facet_altruism","name":"Altruism","category":"personality","percentile":0.2205017197389369},{"trait_id":"facet_cooperation","name":"Cooperation","category":"personality","percentile":0.6043620274418392},{"trait_id":"facet_modesty","name":"Modesty","category":"personality","percentile":0.19729794427894104},{"trait_id":"facet_morality","name":"Uncompromising","category":"personality","percentile":0.3926460296272722},{"trait_id":"facet_sympathy","name":"Sympathy","category":"personality","percentile":0.5912234730698551},{"trait_id":"facet_trust","name":"Trust","category":"personality","percentile":0.8555359783808625}]},{"trait_id":"big5_neuroticism","name":"Emotional range","category":"personality","percentile":0.6633590330225464,"children":[{"trait_id":"facet_anger","name":"Fiery","category":"personality","percentile":0.290121144514719},{"trait_id":"facet_anxiety","name":"Prone to worry","category":"personality","percentile":0.364467924637111},{"trait_id":"facet_depression","name":"Melancholy","category":"personality","percentile":0.7831928687779982},{"trait_id":"facet_immoderation","name":"Immoderation","category":"personality","percentile":0.28579924238636073},{"trait_id":"facet_self_consciousness","name":"Self-consciousness","category":"personality","percentile":0.6853690292528016},{"trait_id":"facet_vulnerability","name":"Susceptible to stress","category":"personality","percentile":0.49373911202539456}]}],"needs":[{"trait_id":"need_challenge","name":"Challenge","category":"needs","percentile":0.3500807233011549},{"trait_id":"need_closeness","name":"Closeness","category":"needs","percentile":0.15254098686089987},{"trait_id":"need_curiosity","name":"Curiosity","category":"needs","percentile":0.7158943563207922},{"trait_id":"need_excitement","name":"Excitement","category":"needs","percentile":0.24798985546330268},{"trait_id":"need_harmony","name":"Harmony","category":"needs","percentile":0.10558765840342582},{"trait_id":"need_ideal","name":"Ideal","category":"needs","percentile":0.289419780655109},{"trait_id":"need_liberty","name":"Liberty","category":"needs","percentile":0.3826548293469901},{"trait_id":"need_love","name":"Love","category":"needs","percentile":0.2501559602042245},{"trait_id":"need_practicality","name":"Practicality","category":"needs","percentile":0.4499078949909319},{"trait_id":"need_self_expression","name":"Self-expression","category":"needs","percentile":0.1983961717819486},{"trait_id":"need_stability","name":"Stability","category":"needs","percentile":0.3361756679364575},{"trait_id":"need_structure","name":"Structure","category":"needs","percentile":0.8501602536945084}],"values":[{"trait_id":"value_conservation","name":"Conservation","category":"values","percentile":0.01844502770154387},{"trait_id":"value_openness_to_change","name":"Openness to change","category":"values","percentile":0.6151391901082154},{"trait_id":"value_hedonism","name":"Hedonism","category":"values","percentile":0.07644902130840453},{"trait_id":"value_self_enhancement","name":"Self-enhancement","category":"values","percentile":0.20459553475464157},{"trait_id":"value_self_transcendence","name":"Self-transcendence","category":"values","percentile":0.41632856427949816}],"warnings":[]}'}];

module.exports = {
  /**
   * Calculate the euclidean distance between a profile and careers
   * @param  {Object} profile   the profile object
   * @param  {Int} type the type of distances being calculated
   * @return {Array} careers and distances
   */
  calculateDistances: function(profile, type) {
    return careers.map(function(career) {
      var ret = {
        emphasis: career.name,
        distance: similarity(profile, career.profile, type)//,
        //profile: flatten.traits(career.profile, type)
      };
      return ret;
    }).sort(profileSort);
  }
};