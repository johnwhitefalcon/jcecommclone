 
import { MongoClient } from "mongodb";

export default async function handler(req, res) {

const uri = 'mongodb+srv://johnwhitefalcon:Flow8404@cluster0.ufllo.mongodb.net/mongdbase?retryWrites=true&w=majority'
const dbname = 'mongdbase'

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("mongdbase");
    const collection = database.collection("mongcollect");

    const agg = [
      {
        $vectorSearch: {
          index: "jcindex",
          path: "data.embedding",
          queryVector: [-0.007021796,-0.0052579474,0.011873218,-0.024888739,-0.024579644,0.03972522,-0.010065694,-0.009407191,-0.01325742,-0.010025377,-0.011732111,0.007747493,-0.014164541,0.007760932,0.010280715,-0.005053005,0.022940107,-0.0015496666,0.015024628,-0.010388226,0.0048447032,0.0124578085,0.0048447032,0.010892183,-0.006692544,-0.00032316218,0.0055704005,-0.0125787575,0.016381951,0.004488574,0.0066051916,-0.007183062,-0.015091822,-0.006581674,-0.018505288,0.0041694012,0.0031782866,-0.018975647,0.030291153,-0.007465278,0.008117061,0.009521421,-0.0011330625,-0.00042584335,-0.00882932,-0.028570982,0.0029699844,0.009272802,0.016449144,0.0065010404,0.019472884,0.014809606,-0.025762264,-0.009931305,-0.0032975562,0.01499775,-0.036903065,0.014057031,0.01335821,0.004394502,-0.0048883795,0.003195085,-0.0110803265,0.0024240315,-0.014204858,-0.018545603,-0.024673717,-0.0035041785,0.018048367,0.008500068,0.034215298,0.015145577,0.014083908,-0.0065917526,0.021985948,0.022053143,0.005449451,0.020830208,0.008298486,-0.011900096,0.0076399827,-0.025036566,0.010663723,0.016771676,0.009460946,-0.0006089476,-0.0029918225,0.028974148,-0.032952044,-0.030425543,0.0077340547,0.02010451,0.009917866,0.018034928,-0.0056308755,0.0082716085,-0.010200082,0.020413604,0.022335358,-0.034672216,0.0053453,0.013190225,-0.017389864,-0.008150659,-0.029807355,0.01777959,0.021542467,-0.016838871,0.016301317,0.0037628761,-0.029242923,0.01220247,-0.018169317,-0.017215159,0.0030825348,0.016865749,0.010744356,-0.013976397,-0.021488711,-0.030156765,0.009971622,0.012585477,0.030237399,-0.017578008,0.026313256,0.019580396,-0.0058626956,-0.031312507,0.0067026233,-0.0018394417,0.037386864,0.024458695,0.010757795,0.014863361,-0.013109592,0.022980422,-0.035989225,0.0025852975,-0.02754963,-0.01278034,0.012955045,0.02697176,0.0028271968,-0.0030741354,0.012740023,0.011053449,-0.0021854918,-0.010522614,0.0213812,-0.012988643,-0.0027902399,0.004021574,0.004928696,-0.014970872,-0.010603247,0.017215159,0.005415854,0.008043148,0.0019200748,-0.0299955,0.011019852,0.009225766,0.016919505,-0.014513951,0.033973396,0.05114824,-0.0036788834,0.005436012,-0.0058526164,-0.008318644,-0.02964609,0.028570982,-0.06418392,0.012726585,-0.041418515,0.0036990417,0.026138552,0.013317894,-0.020749575,-0.019042842,-0.039832734,0.0023887544,0.0049085375,0.025117198,-0.02721366,-0.013936081,0.000046091034,0.0040887683,0.0008008711,0.0030522973,0.016583534,0.022026265,0.009286241,-0.00802299,-0.68935895,-0.0038132719,0.020588309,-0.026286379,0.025587559,0.038381338,0.00082690886,0.018679993,-0.025600998,0.020601748,-0.019217547,-0.0024710675,-0.0109325,-0.012410772,0.0029095097,-0.012699707,0.010294154,-0.006554796,-0.014782728,0.00836568,0.005056365,0.032387614,0.0016403788,0.014312369,0.019110035,-0.00012945387,0.00987755,-0.018814381,-0.0017638482,0.03185006,-0.029350435,-0.003228682,-0.0024777867,0.010549492,0.060958594,-0.020642065,-0.009440788,-0.0050026095,-0.005556962,0.0017739274,-0.018048367,-0.026084796,0.021004913,-0.0044650557,0.005832458,-0.00406525,0.0049690125,-0.021179618,0.005254588,0.0056745517,0.0018814381,-0.0018881576,0.010865306,-0.0013144868,0.014809606,0.009817075,0.04321932,-0.016529778,0.0012682909,0.015494986,-0.0037931136,0.022093458,-0.029108535,-0.013660585,0.0028557542,0.0096087735,-0.011913535,0.0066522276,0.009669248,-0.0057921414,0.015844397,0.013855448,-0.020292655,-0.006064278,0.0019939884,0.026770176,0.018572481,-0.009373593,-0.020615187,0.01823651,0.006682465,-0.0036251282,-0.02312825,-0.016556656,0.025251588,-0.006067638,-0.022295041,0.009447507,0.0067597385,0.0047002356,0.013143189,0.010878744,-0.008110343,-0.0014127585,0.0041089263,0.0058123,-0.000025132213,0.014204858,-0.0077071767,-0.0037192,-0.014796167,0.015978785,-0.028382838,0.0054259333,0.0076601407,-0.0015547063,-0.003230362,0.019244425,0.033086434,-0.023786753,-0.006077717,-0.008708371,-0.0028456752,-0.01335821,-0.006648868,-0.023921141,0.010206802,0.0055132858,0.023665804,-0.00024609882,0.020964596,-0.002778481,-0.0030270994,0.0011868179,0.026770176,0.008177537,0.0076332632,-0.0213812,-0.02230848,-0.003998056,0.007498875,-0.0008878036,0.054239172,-0.016973259,0.02521127,-0.0024341105,0.018397776,-0.0007630743,0.016099734,-0.0053016236,-0.020050755,0.0152665265,-0.017591447,0.0066085514,0.01046214,-0.018384337,-0.018706871,-0.0072368174,0.009467665,-0.010321032,0.0020443841,-0.0125250025,-0.024512451,0.026635788,0.012256226,-0.017873662,0.004824545,-0.015790641,-0.0075593498,-0.021529028,-0.0018159237,0.011302068,-0.010952658,0.01615349,-0.010206802,-0.0045490484,-0.037763152,0.013385088,-0.016516339,-0.026393889,-0.00325388,-0.020843647,-0.0058492566,-0.0002475687,-0.014003275,-0.0043642647,-0.019996999,-0.0019603914,0.023020739,-0.016314756,0.008540385,0.013842009,-0.0028087182,0.015293404,0.0165029,0.014191419,-0.001778967,0.015763763,0.0077004572,-0.017873662,0.0037359986,-0.013465721,-0.013405247,0.00053587387,-0.011570845,0.00039224623,-0.007955795,0.030344909,0.017322669,0.00882932,0.033677742,0.006309537,0.042843033,-0.025708508,-0.0045893653,-0.021636538,0.0024475495,-0.022375675,0.018021489,0.012746743,0.0039107036,-0.02127369,-0.012148715,0.01023368,0.015293404,0.02580258,-0.007371206,0.007794529,-0.001940233,0.008238011,0.004989171,-0.0067933355,0.004115646,-0.0124309305,-0.013418686,0.005684631,0.026662666,0.035747323,0.005684631,-0.02369268,-0.003055657,-0.0039140633,0.0009012424,0.010959377,0.013788254,0.017685518,0.029162291,0.0008529466,0.028974148,-0.0035646532,-0.010616686,0.023087934,0.018800942,-0.0073980833,0.024351185,0.0045725666,0.020158265,0.001452235,-0.019674467,0.010011938,-0.011315506,0.012605635,-0.031661917,-0.0063868104,0.021367762,-0.013324614,0.000015984875,0.013371649,0.026205745,0.018800942,0.015844397,-0.018908452,-0.0044448976,-0.00059214904,0.018975647,-0.009944744,-0.014070469,-0.0046196026,-0.016825432,0.014110786,-0.007357767,-0.0071091484,0.035263527,-0.008224572,0.02418992,-0.00025386814,0.009541579,-0.0009398791,-0.016919505,0.0043709837,0.0013926001,-0.044348184,0.0073174504,0.0072368174,-0.002024226,-0.019392252,-0.033623986,0.037413742,0.0039342213,0.00097095646,0.0002534482,0.009057781,0.020695819,0.00209142,0.0007412362,0.0234911,0.013371649,-0.02870537,-0.0020040676,0.0016319796,0.008318644,0.017362986,-0.0037964734,-0.027818406,0.030721197,-0.0070150765,0.0055972785,0.021905316,0.0066690263,-0.009978342,0.0060508396,0.018518727,-0.0038838258,-0.023907702,0.024149602,0.0071763424,-0.019432567,-0.004545689,0.034699094,0.013801692,-0.0036284877,-0.029081658,-0.01929818,0.0055401633,0.06262501,0.021287128,-0.004663279,-0.0040585306,0.007216659,0.0053150626,-0.010717478,-0.033328332,0.008903234,-0.02160966,-0.0017756072,0.004394502,0.0153068425,0.006880688,0.015871275,-0.0033882684,0.0106906,-0.0068134936,-0.0012649312,-0.023397027,-0.0097028455,0.027468996,0.012813938,0.004579286,0.01765864,0.0002578578,0.0046565593,0.010643564,0.012222628,-0.05147077,-0.020185143,0.031420015,0.008043148,0.009870831,-0.0050731637,0.029189168,-0.0054091346,-0.015051505,0.018747186,-0.0018915172,0.021569343,0.019392252,0.01708077,-0.015710007,0.009467665,-0.0033109952,0.0021014991,-0.00069630006,-0.013909203,-0.0037158402,0.0020040676,-0.008070026,-0.0074719973,-0.02334327,0.008238011,0.0098237945,-0.0097700395,0.0063028177,-0.018868137,-0.02651484,0.007713896,0.008291767,-0.0065917526,-0.0038099121,-0.018290266,-0.01313647,-0.00042017383,0.0036923222,-0.020964596,-0.0060609183,0.0025013047,0.008150659,0.0013002082,0.01360683,0.013526197,0.003998056,0.0051437174,-0.015374037,-0.023316395,-0.010724197,-0.0012649312,-0.035989225,0.007041954,-0.010193363,-0.023544854,0.016664166,0.005486408,0.011429736,0.0052008326,0.012021045,0.02418992,0.0031816463,0.0062692207,-0.016919505,0.003080855,-0.026756737,0.0018881576,-0.03453783,-0.010536053,-0.019217547,-0.0073846444,-0.0034353044,0.0059466884,-0.0064909616,0.0124174915,0.0025517005,0.008486629,0.031070607,-0.01452739,0.01941913,-0.000267307,0.00048253848,-0.010361348,0.0004439018,-0.0082581695,0.01185306,0.008748687,-0.00009664419,0.008701651,-0.022819156,0.025506925,-0.059238423,0.012242787,0.029511701,0.00088864355,0.014446757,-0.011006413,-0.012840815,0.0031346104,-0.006238983,-0.009575176,0.0057249474,-0.018344022,-0.014406441,-0.029672967,-0.007794529,-0.016220685,0.0038166316,-0.01894877,-0.0077206157,-0.023974897,0.002336679,0.008775565,-0.00011181538,-0.022268163,-0.024727473,0.0036822432,0.01814244,-0.0068638893,0.034349684,0.00089452305,0.01126847,-0.01394952,-0.018317144,0.0021367762,-0.027186781,-0.013989836,-0.019701345,0.009790198,0.024270551,0.02859786,-0.0044213794,0.012726585,0.0042265165,-0.015938468,0.002533222,0.002603776,-0.011685074,-0.018263388,0.011167679,0.0053788973,0.023612048,0.015468109,-0.009588615,0.004149243,-0.014930556,0.012820656,-0.016650727,-0.013922642,-0.024794666,0.0029481463,0.0082850475,-0.00929968,0.012309981,-0.016664166,0.0068134936,0.046095233,0.01057637,0.008654615,0.026944881,0.00032946165,-0.018034928,0.0125653185,-0.00034961992,0.015468109,-0.018438093,-0.015078383,-0.012296542,0.0017974454,0.030855585,0.016207246,-0.0044818544,-0.013102872,0.007263695,0.0011842981,-0.01753769,0.0060038036,-0.0029414268,0.013506038,-0.0049824514,-0.032011326,0.0020847006,-0.0083522415,-0.024727473,-0.008379119,0.016005663,-0.01360011,0.010905622,-0.02404209,-0.0068302923,-0.0022090098,0.00048253848,0.029780477,0.0106906,0.0010314313,0.008547105,-0.009978342,-0.0055200052,0.007519033,-0.009024183,-0.011994168,0.035129137,0.016986698,0.0029716643,-0.00174369,0.015535303,0.022362236,-0.01616693,-0.019795416,0.015710007,0.013660585,0.0047237533,-0.039348934,-0.016301317,-0.050395664,0.023397027,0.016462583,-0.020252338,-0.027818406,0.0006379251,-0.040692817,0.025359098,-0.01849185,-0.0031564485,0.013062556,-0.0024374702,-0.031231873,0.0067630983,-0.002276204,0.00024609882,0.0063700117,0.03416154,-0.013324614,0.014943995,0.0060877963,0.019674467,-0.0063532135,-0.009669248,0.0033832288,0.019849172,-0.037440617,-0.008896515,-0.00430043,-0.0125250025,0.008977148,-0.006265861,-0.017215159,-0.003568013,-0.015521864,-0.011550686,0.01184634,-0.0033731498,-0.021703733,-0.011725391,0.0044012214,-0.022321919,-0.013190225,-0.011443175,0.013344772,-0.02651484,-0.024969371,-0.004834624,0.010818269,0.0052512283,-0.0008878036,-0.0065850336,0.019486323,0.037978172,-0.0070352345,0.0152799655,0.0018142438,0.0067832563,-0.033435844,0.0058828536,0.0002685669,0.0006286859,0.028463472,-0.018505288,-0.026393889,0.008856198,-0.002916229,0.020010438,0.013149909,-0.009165292,-0.008533666,0.021394638,-0.00139428,-0.00859414,-0.024136163,0.021690294,0.008694932,-0.0054225735,0.0060978755,-0.016462583,0.0014161181,-0.010092571,-0.0035075382,0.009487824,-0.024593083,-0.03402715,-0.001428717,0.0012422531,0.004488574,-0.026299817,-0.019096596,-0.01592503,-0.0013623628,-0.007041954,-0.005879494,0.001197737,-0.008977148,0.005167235,-0.011732111,0.02870537,-0.015830958,-0.01858592,-0.021569343,0.00014572746,-0.027106147,-0.025466608,-0.009239205,0.02556068,0.015132138,-0.00907122,-0.012189032,-0.01313647,-0.028275328,-0.0110400105,-0.004112286,0.0018209633,0.020763014,0.008674773,-0.0032370815,0.03289829,0.0004439018,0.027791528,-0.0068168533,0.00044726153,-0.007183062,-0.008009551,0.0037931136,0.008661334,0.00082270923,-0.014419879,0.038757626,0.014540829,0.005207552,0.017134525,0.0027264054,-0.00790876,-0.013385088,-0.002927988,-0.0062792995,0.010569651,0.005069804,-0.00929968,-0.013311175,0.00325388,-0.0068739685,-0.00025029847,0.014446757,0.009380313,0.0125250025,0.0098909885,-0.010569651,0.0019167151,-0.016906066,-0.015723446,0.025480047,-0.00089452305,-0.025197832,0.020158265,0.00084748707,-0.004428099,-0.023302956,0.030479297,-0.018962208,-0.013075995,-0.0076534213,-0.01708077,-0.033543352,0.0013052477,-0.007579508,-0.010247118,-0.0035041785,-0.005264667,-0.025547242,-0.0260176,-0.0038099121,0.0054091346,-0.03185006,-0.045181394,-0.013687463,0.027710896,-0.009978342,-0.00929968,-0.006870609,-0.012854254,0.012249506,0.013761376,-0.0004590205,-0.01220247,0.031097485,0.016140051,-0.0111475205,0.027052393,0.23071806,-0.015387476,0.0154009145,0.03972522,0.0055368035,0.026676105,0.002927988,0.0020376646,-0.014755851,0.0039778976,-0.008688212,-0.0017940856,0.01893533,-0.006000444,0.025641313,0.007834846,-0.019271301,-0.014057031,-0.015710007,-0.029511701,0.008728529,0.002150215,-0.0017991252,-0.021784365,0.0060239616,-0.0058358177,-0.013553074,-0.012343578,0.027455557,0.019002525,-0.0069546015,-0.009252644,0.021475272,0.005005969,-0.017389864,0.011476773,0.008936831,-0.0045255306,0.028436594,0.027092708,0.011207996,-0.0005031167,-0.012834095,-0.01963415,-0.008493349,0.017362986,-0.0023971538,-0.008654615,-0.012041204,-0.004381063,0.00882932,0.0041526025,0.011302068,0.01278034,0.012813938,-0.0026188947,0.024929054,-0.0112281535,-0.03195757,0.024351185,-0.0011674996,0.016543217,-0.0047707893,0.009864111,-0.014164541,-0.006410328,0.007337609,-0.004696876,0.005311703,0.0011523808,0.00092812016,-0.016932944,-0.0027717615,-0.007465278,-0.030963095,-0.010475579,-0.002056143,0.019781977,0.031796303,0.018411215,-0.027576508,-0.012713146,0.010441981,-0.025439732,-0.025157515,-0.029834233,0.0016655767,-0.01370762,-0.010636845,-0.008278328,-0.011113924,-0.016462583,-0.009602054,-0.006128113,0.002125017,-0.008117061,-0.017134525,0.028893514,0.0072704144,0.0074115223,-0.029135413,0.020346409,0.011987449,0.013559793,-0.012908009,-0.010784672,-0.0124443695,0.011261751,0.0070486735,-0.015011189,-0.0034773008,0.011019852,0.013022239,0.0048312643,-0.013626987,0.0062289042,0.015374037,-0.013741218,0.0039140633,-0.0010221921,-0.009628931,-0.019540079,-0.0061079543,-0.0009046022,-0.00697476,-0.012968484,-0.013526197,-0.01884126,0.012793779,-0.024418378,0.0050126887,0.010784672,0.010831708,-0.0030489378,-0.008036428,0.0051571564,0.0024542687,-0.009030903,-0.011866499,0.03314019,-0.0012481326,-0.008446313,0.0068403715,0.00021922114,0.011785866,-0.034484074,-0.0031682074,-0.010038816,-0.007747493,-0.018451532,-0.028651614,-0.013311175,-0.01591159,-0.0007987713,0.020507675,-0.016435705,-0.031366263,-0.026057918,0.01336493,0.00018110941,-0.021193057,0.0049790917,0.029431067,-0.014661779,0.00441466,-0.0036990417,-0.17621012,0.00151187,0.006927724,-0.011248312,0.019015964,-0.013297736,0.003045578,0.0011129043,-0.0028154377,0.015978785,-0.00032841176,-0.010838428,-0.04321932,-0.012921448,-0.01639539,0.016704483,-0.027818406,0.004112286,0.011557406,0.030774953,0.017685518,-0.005160516,0.019996999,-0.02021202,0.0014438358,0.001452235,0.009817075,0.032011326,0.005019408,-0.009124975,-0.0063263355,-0.010421824,-0.0078012487,0.004975732,0.027388364,-0.011658197,0.0047136745,-0.027092708,-0.014970872,0.025144076,0.03391964,0.032118835,0.0029565457,-0.013028959,0.004192919,0.016811993,0.018424654,-0.010200082,0.011678355,-0.0058290986,0.012155434,-0.04321932,0.0015370677,-0.017295793,0.003126211,0.023921141,-0.01149693,-0.012262945,0.009541579,0.024270551,0.003662085,-0.020897401,0.016408829,0.010489018,0.013210383,-0.017255476,-0.009628931,0.0097297225,-0.014755851,0.01859936,-0.02428399,-0.018021489,0.0035243367,-0.011315506,0.012766901,-0.010643564,-0.022711646,0.02662235,-0.0027935996,-0.021193057,-0.021529028,0.033328332,-0.015159016,0.01790054,0.012195751,0.022093458,-0.004461696,0.0037024014,0.0026793694,0.0007496355,0.032522,-0.0061314725,-0.010267276,-0.014285491,0.022214409,0.016355073,0.015548742,0.0022006107,-0.00035234969,-0.00059676863,-0.013868887,-0.034080908,-0.011933693,0.0034101065,0.019163791,0.008385838,0.011221434,0.0006937803,0.0042701927,-0.019647589,-0.031231873,0.017403303,0.019728223,0.028974148,-0.000557712,0.010972816,-0.025936969,-0.021663416,0.008977148,0.017053893,0.03765564,-0.0058290986,-0.0055334438,0.014567707,-0.00010163125,-0.012135276,-0.06520527,-0.021945631,0.010892183,0.028759126,0.0036217684,0.017067332,-0.0006790816,0.0058290986,-0.00070049975,-0.0029313478,-0.004048452,-0.029511701,-0.025654752,-0.013465721,0.013741218,-0.008842759,0.0024811465,-0.0020393445,-0.00082900864,0.02264445,-0.014903678,-0.019728223,0.0018562403,-0.01814244,-0.009346716,-0.0001382731,-0.034430318,0.035129137,0.01695982,-0.010999694,-0.0076063857,-0.004438178,0.026837371,-0.019257862,-0.022214409,0.0070621124,-0.044482574,-0.0045624874,0.021744048,-0.027267413,-0.007169623,0.008231292,-0.0019083158,-0.023208883,-0.015790641,-0.0038099121,-0.007962515,0.041069105,0.005970206,-0.020386726,-0.030855585,-0.009917866,-0.029108535,-0.020736136,0.02335671,0.0029179088,0.026205745,0.002000708,-0.024391502,-0.0003090934,0.007122587,-0.016543217,-0.005335221,0.017336108,0.012619074,0.009575176,-0.011772427,0.0049555735,0.011664916,0.0052713864,-0.008903234,0.0082716085,-0.014204858,0.025587559,-0.01790054,-0.0058492566,-0.02299386,-0.030506175,0.023329832,0.0013489239,-0.017147964,-0.02091084,-0.0013464042,-0.019566957,0.0057854224,0.019472884,-0.005385617,0.008231292,0.003534416,-0.026326695,0.014097347,0.044133164,0.0064943214,-0.020830208,-0.008083465,-0.0052041924,0.01033447,0.0069881985,0.01161788,-0.0022694848,-0.028974148,-0.023504538,-0.06391514,0.02580258,0.008305205,-0.008540385,-0.0082044145,-0.009091378,-0.010992974,-0.005325142,-0.01417798,0.005684631,-0.00022300081,-0.0054124943,0.009017464,-0.0035276965,-0.018102122,0.006487602,0.021367762,-0.008607579,0.024808105,0.004757351,-0.01022696,-0.010475579,0.0001312387,-0.00089536293,-0.0060575586,0.01522621,-0.03916079,0.018868137,-0.01080483,-0.015091822,0.010838428,-0.03289829,-0.0038771064,0.015091822,-0.005311703,-0.0031530887,-0.0077407737,0.044778228,0.0044482574,-0.0013161667,-0.0030354988,-0.02279228,-0.0036083295,-0.01929818,0.0059802854,0.020386726,-0.019808855,-0.029699845,0.023988336,0.0033093153,0.0061314725,0.012410772,-0.029780477,-0.026823932,-0.015938468,-0.028517226,0.024378063,-0.0153471595,0.0014723933,-0.017242037,0.04542329,-0.008426155,-0.010515895,-0.023786753,0.012424211,-0.000487998,-0.01709421,0.01382857,0.0010658683,-0.011685074,-0.013371649,-0.0025836176,-0.004035013,0.036069855,0.01580408,0.016811993,-0.014366124,0.013667304,-0.0083388025,0.021865,0.010058975,0.0051437174,-0.014151102,0.0030019018,0.030371787,0.022456307,-0.009581896,-0.00094323885,-0.008049867,0.0030019018,-0.019513201,0.013217103,-0.004938775,0.000043177533,0.010435262,0.0066186306,0.0018327223,0.005963487,0.014836484,0.02265789,0.004555768,-0.00894355,0.0017352906,-0.006148271,-0.004915257,-0.00014740732,-0.03733311,-0.031097485,0.012612355,-0.0021334165,-0.011006413,-0.008298486,0.03496787,0.017134525,-0.021730611,0.023786753,0.0018327223,-0.009783478,-0.025708508,0.026877686,-0.0010683881,0.0072704144,0.027012076,-0.013230542,0.014231736,0.0034386641,0.00859414,-0.024673717,0.0077340547,0.0027398441,-0.00942063,0.0027667219,-0.005022768,-0.019136913,0.0007172983,0.008043148,-0.009978342,0.035639815,-0.0068302923,0.08224572,-0.0019368733,-0.0023064415,0.008849478,-0.0039476603,0.023087934,0.008909954,0.020897401,-0.014030153,0.0028171176,0.0116246,0.003102693,-0.0081305,-0.00836568,-0.016422266,-0.012612355,-0.0056779115,0.016140051,-0.0167448,0.010011938,0.018545603,0.012692988,0.020978035,0.0151186995,-0.01243765,-0.023114812,0.023061056,-0.014608023,-0.014661779,-0.029834233,-0.011718672,-0.0015412674,-0.026662666,-0.008150659,0.01081155,0.010791391,-0.0050731637,-0.032817658,-0.0037998331,0.014715534,0.0032555598,0.026125113,-0.010079132,-0.0032370815,-0.00030846347,0.010905622,-0.017013576,-0.000082575396,-0.023988336],
          limit: 10,
          numCandidates: 100,
        },
        
        

      },
    ];

    const result = await collection.aggregate(agg)
    
    res.status(200).json({ result });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}

