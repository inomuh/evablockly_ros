/**
 * ****************************************************************************
 * im_ros_functions.js
 *
 * AMAÇ: Block factory kullanılarak oluşturulan blokların çalıştırılma sırasında 
 * gerçekleştireceği işlemler belirlenmiştir.
 *
 * GELİŞTİRME GEÇMİŞİ
 *
 * Yazar: Fatih İNAN
 * Tarih: 14.09.2015
 * Güncelleme Tarihi: 14.09.2015
 * Versiyon: v1.0
 *
 * ****************************************************************************
 */

keys = [];

/**
 * Web sayfası üzerinden roscore'a bağlanmayı sağlayan bloktur.
 */
Blockly.JavaScript['connect_to_ros'] = function(block) {

	var code = "ros = new ROSLIB.Ros({ \n" + "url : 'ws://localhost:9090' \n" + "}); \n" + "ros.on('connection', function() { \n" + "console.log('Connected to websocket server.'); \n" + "}); \n" + "ros.on('error', function(error) { \n" + "console.log('Error connecting to websocket server: ', error); \n" + "}); \n" + "ros.on('close', function() { \n" + "console.log('Connection to websocket server closed.'); \n" + "}); \n";

	return code;
};

/**
 * Girilen pid parametrelerini uygulamayı sağlayan bloktur.
 */
Blockly.JavaScript['set_pid'] = function(block) {
  var value_lkp = Blockly.JavaScript.valueToCode(block, 'lkp', Blockly.JavaScript.ORDER_ATOMIC);
  var value_lkd = Blockly.JavaScript.valueToCode(block, 'lkd', Blockly.JavaScript.ORDER_ATOMIC);
  var value_lki = Blockly.JavaScript.valueToCode(block, 'lki', Blockly.JavaScript.ORDER_ATOMIC);
  var value_rkp = Blockly.JavaScript.valueToCode(block, 'rkp', Blockly.JavaScript.ORDER_ATOMIC);
  var value_rkd = Blockly.JavaScript.valueToCode(block, 'rkd', Blockly.JavaScript.ORDER_ATOMIC);
  var value_rki = Blockly.JavaScript.valueToCode(block, 'rki', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  return code;
};

/**
 * Belirlenen topic ismi ve tipi ile veri basmayı sağlayan bloktur.
 *
 * Girdi olarak publisher ismi ve veri tipini alır.
 */
Blockly.JavaScript['create_publisher'] = function(block) {
	var value_publisher_name = Blockly.JavaScript.valueToCode(block, 'publisher_name', Blockly.JavaScript.ORDER_ATOMIC);
	var value_publisher_type = Blockly.JavaScript.valueToCode(block, 'publisher_type', Blockly.JavaScript.ORDER_ATOMIC);
	var code = "topic = new ROSLIB.Topic({ \n" + "ros : ros, \n" + "name : '/' + " + value_publisher_name + ",   //  anything \n" + "messageType : " + value_publisher_type + "  //  anything \n" + "}); \n";
	return code;
};

/**
 * Publisher üzeriden veri basan bloktur.
 *
 * Girdi olarak publisher oluşturulurken belirlenen tipte veri girilir.
 */
Blockly.JavaScript['publish_data'] = function(block) {
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
	value_data = value_data.substring(1, value_data.length - 1)
	var code;
	var res;
	try {
		res = value_data.split(":");
	} catch(err) {
		document.getElementById("demo").innerHTML = err.message;
	}
	if (res[0] == "cmd_vel") {
		code = "var twist = new ROSLIB.Message({ \n" + "linear : { \n" + "x : " + res[1] + ", \n" + "y : " + res[2] + ", \n" + "z : " + res[3] + " \n" + "}, \n" + "angular : { \n" + "x : " + res[4] + ", \n" + "y : " + res[5] + ", \n" + "z : " + res[6] + " \n" + "} \n" + "}); \n" + "topic.publish(twist); \n";
	} else {
		code = "var twist = new ROSLIB.Message({ \n" + "data :" + value_data + "\n" + "}); \n" + "console.log('Sended message : ' + '" + value_data + "'); \n" + "topic.publish(twist); \n";
	}
	return code;
};

/**
 * Belirlenen topic ismi ve tipi ile topic üzerinden verileri okumayı sağlayan bloktur.
 */
Blockly.JavaScript['create_subscriber'] = function(block) {
	var value_subscriber_name = Blockly.JavaScript.valueToCode(block, 'subscriber_name', Blockly.JavaScript.ORDER_ATOMIC);
	var value_subscriber_type = Blockly.JavaScript.valueToCode(block, 'subscriber_type', Blockly.JavaScript.ORDER_ATOMIC);
	var code = "listener = new ROSLIB.Topic({ \n" + "ros : ros, \n" + "name : '/' + " + value_subscriber_name + ",  //  sonar1	 \n" + " messageType : " + value_subscriber_type + " //  sensor_msgs/Range \n" + "}); \n";

	return code;
};

/**
 * Subscriber üzerinden veri okuyan bloktur.
 *
 * Veri alındığında gerçekleştirilecek işlemler belirlenmiştir.
 */
Blockly.JavaScript['subscribe'] = function(block) {
	var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
	var code = "listener.subscribe(function(message) { \n" + "console.log('Received message :' + message.range); \n" + statements_statements + "});";
	return code;
};

/**
 * sensor_msgs/Range tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan bloktur.
 */
Blockly.JavaScript['get_range_value'] = function(block) {
	var dropdown_dd_value_of = block.getFieldValue('dd_value_of');

	if (dropdown_dd_value_of == 'ULTRASOUND') {
		code = "message.ULTRASOUND"
	} else if (dropdown_dd_value_of == 'INFRARED') {
		code = "message.getINFRARED"
	} else if (dropdown_dd_value_of == 'header_seq') {
		code = "message.header.seq"
	} else if (dropdown_dd_value_of == 'header_stamp') {
		code = "message.header.stamp"
	} else if (dropdown_dd_value_of == 'header_frame_id') {
		code = "message.header.frame_id"
	} else if (dropdown_dd_value_of == 'radiation_type') {
		code = "message.radiation_type"
	} else if (dropdown_dd_value_of == 'field_of_view') {
		code = "message.field_of_view"
	} else if (dropdown_dd_value_of == 'min_range') {
		code = "message.min_range"
	} else if (dropdown_dd_value_of == 'max_range') {
		code = "message.max_range"
	} else if (dropdown_dd_value_of == 'range') {
		code = "message.range"
	}

	return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
 * nav_msgs/Odometry tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan bloktur.
 */
Blockly.JavaScript['get_odom_value'] = function(block) {
	var dropdown_dd_value_of = block.getFieldValue('dd_value_of');

	if (dropdown_dd_value_of == 'pose_position_x') {
		code = "message.pose.pose.position.x"
	} else if (dropdown_dd_value_of == 'pose_position_y') {
		code = "message.pose.pose.position.y"
	} else if (dropdown_dd_value_of == 'pose_position_z') {
		code = "message.pose.pose.position.z"
	} else if (dropdown_dd_value_of == 'pose_orientation_x') {
		code = "message.pose.pose.orientation.x"
	} else if (dropdown_dd_value_of == 'pose_orientation_y') {
		code = "message.pose.pose.orientation.y"
	} else if (dropdown_dd_value_of == 'pose_orientation_z') {
		code = "message.pose.pose.orientation.z"
	} else if (dropdown_dd_value_of == 'pose_orientation_w') {
		code = "message.pose.pose.orientation.w"
	} else if (dropdown_dd_value_of == 'pose_covariance') {
		code = "message.pose.covariance"
	} else if (dropdown_dd_value_of == 'twist_linear_x') {
		code = "message.twist.twist.linear.x"
	} else if (dropdown_dd_value_of == 'twist_linear_y') {
		code = "message.twist.twist.linear.y"
	} else if (dropdown_dd_value_of == 'twist_linear_z') {
		code = "message.twist.twist.linear.z"
	} else if (dropdown_dd_value_of == 'twist_angular_x') {
		code = "message.twist.twist.angular.x"
	} else if (dropdown_dd_value_of == 'twist_angular_y') {
		code = "message.twist.twist.angular.y"
	} else if (dropdown_dd_value_of == 'twist_angular_z') {
		code = "message.twist.twist.angular.z"
	} else if (dropdown_dd_value_of == 'twist_covariance') {
		code = "message.twist.covariance"
	} else if (dropdown_dd_value_of == 'header_seq') {
		code = "message.header.seq"
	} else if (dropdown_dd_value_of == 'header_stamp') {
		code = "message.header.stamp"
	} else if (dropdown_dd_value_of == 'header_frame_id') {
		code = "message.header.frame_id"
	} else if (dropdown_dd_value_of == 'child_frame_id') {
		code = "message.child_frame_id"
	}

	return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
 * impc_msgs/Bumper tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan bloktur.
 */
Blockly.JavaScript['get_bumper_value'] = function(block) {
	var dropdown_dd_value_of = block.getFieldValue('dd_value_of');

	if (dropdown_dd_value_of == 'header_seq') {
		code = "message.header.seq"
	} else if (dropdown_dd_value_of == 'header_stamp') {
		code = "message.header.stamp"
	} else if (dropdown_dd_value_of == 'header_frame_id') {
		code = "message.header.frame.id"
	} else if (dropdown_dd_value_of == 'bumper0_state') {
		code = "message.state[0].bumper_state"
	} else if (dropdown_dd_value_of == 'bumper1_state') {
		code = "message.state[1].bumper_state"
	} else if (dropdown_dd_value_of == 'bumper2_state') {
		code = "message.state[2].bumper_state"
	}

	return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
 * osgraph_msgs/Clock tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan bloktur.
 */
Blockly.JavaScript['get_clock_value'] = function(block) {
	var dropdown_dd_value_of = block.getFieldValue('dd_value_of');

	if (dropdown_dd_value_of == 'clock_secs') {
		code = "message.clock.secs"
	} else if (dropdown_dd_value_of == 'clock_nsecs') {
		code = "message.clock.nsecs"
	}

	return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
 * Herhangi bir tipte yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan bloktur.
 */
Blockly.JavaScript['get_custom_value'] = function(block) {
	var text_dd_value_of = block.getFieldValue('dd_value_of');

	code = "message." + text_dd_value_of;

	return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
 * geometry_msgs/Twist tipinde veri basmayı sağlayan bloktur.
 * 
 * Parametre olarak x, y, z yönlerindeki lineer hızlar ve x, y, z yönlerindeki açısal hızları almaktadır.
 */
Blockly.JavaScript['cmd_vel'] = function(block) {
	var value_linear_x = Blockly.JavaScript.valueToCode(block, 'linear_x', Blockly.JavaScript.ORDER_ATOMIC);
	var value_linear_y = Blockly.JavaScript.valueToCode(block, 'linear_y', Blockly.JavaScript.ORDER_ATOMIC);
	var value_linear_z = Blockly.JavaScript.valueToCode(block, 'linear_z', Blockly.JavaScript.ORDER_ATOMIC);
	var value_angular_x = Blockly.JavaScript.valueToCode(block, 'angular_x', Blockly.JavaScript.ORDER_ATOMIC);
	var value_angular_y = Blockly.JavaScript.valueToCode(block, 'angular_y', Blockly.JavaScript.ORDER_ATOMIC);
	var value_angular_z = Blockly.JavaScript.valueToCode(block, 'angular_z', Blockly.JavaScript.ORDER_ATOMIC);

	var code = "cmd_vel:" + value_linear_x + ":" + value_linear_y + ":" + value_linear_z + ":" + value_angular_x + ":" + value_angular_y + ":" + value_angular_z;

	return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
 * Klavyenin yön tuşlarına göre robotu süren bloktur.
 * 
 * Basılan tuşa göre veri basarak robotun ileri gitmesi, geri gitmesi, sağa dönmesi, sola dönmesi ve durması sağlanmıştır.
 */
Blockly.JavaScript['teleop'] = function(block) {
	var code = "update(); \n" + "document.body.addEventListener('keydown', function (e) { \n" + "	keys[e.keyCode] = true; \n" + "}); \n" + "document.body.addEventListener('keyup', function (e) { \n" + "	keys[e.keyCode] = false; \n" + "}); \n" + "function update() { \n" + "topic = new ROSLIB.Topic({ \n" + "ros : ros, \n" + "name : '/cmd_vel',   //  anything \n" + "messageType : 'geometry_msgs/Twist'  //  anything \n" + "}); \n" + "//yukarı \n" + "if (keys[38]) { \n" + "var twist = new ROSLIB.Message({ \n" + "linear : { \n" + "x : 0.1, \n" + "y : 0, \n" + "z : 0 \n" + "}, \n" + "angular : { \n" + "x : 0, \n" + "y : 0, \n" + "z : 0 \n" + "} \n" + "}); \n" + "topic.publish(twist); \n" + "	keys[38] = false; \n" + "} \n" + "//aşağı \n" + "if (keys[40]) { \n" + "var twist = new ROSLIB.Message({ \n" + "linear : { \n" + "x : -0.1, \n" + "y : 0, \n" + "z : 0 \n" + "}, \n" + "angular : { \n" + "x : 0, \n" + "y : 0, \n" + "z : 0 \n" + "} \n" + "}); \n" + "topic.publish(twist); \n" + "	keys[40] = false; \n" + "} \n" + "//sağ \n" + "if (keys[39]) { \n" + "var twist = new ROSLIB.Message({ \n" + "linear : { \n" + "x : 0, \n" + "y : 0, \n" + "z : 0 \n" + "}, \n" + "angular : { \n" + "x : 0, \n" + "y : 0, \n" + "z : 0.1 \n" + "} \n" + "}); \n" + "topic.publish(twist); \n" + "	keys[39] = false; \n" + "}	 \n" + "//sol \n" + "if (keys[37]) { \n" + "var twist = new ROSLIB.Message({ \n" + "linear : { \n" + "x : 0, \n" + "y : 0, \n" + "z : 0 \n" + "}, \n" + "angular : { \n" + "x : 0, \n" + "y : 0, \n" + "z : -0.1 \n" + "} \n" + "}); \n" + "topic.publish(twist); \n" + "	keys[37] = false; \n" + "} \n" + "//space \n" + "if (keys[32]) { \n" + "var twist = new ROSLIB.Message({ \n" + "linear : { \n" + "x : 0, \n" + "y : 0, \n" + "z : 0 \n" + "}, \n" + "angular : { \n" + "x : 0, \n" + "y : 0, \n" + "z : 0 \n" + "} \n" + "}); \n" + "topic.publish(twist); \n" + "	keys[32] = false; \n" + "} \n" + "setTimeout(update, 10); \n" + "}";

	return code;
};

Blockly.JavaScript['wander'] = function(block) {
	var code = "var sonar3;" + 
	"var sonar6;" + 
	"var sonar1;" + 
	"topic = new ROSLIB.Topic({" + 
	"ros : ros," + 
	"name : '/' + ('cmd_vel')," + 
	"messageType : 'geometry_msgs/Twist'" + 
	"});" + 
	"listener = new ROSLIB.Topic({" + 
	"ros : ros," + 
	"name : '/' + ('sonar3')," + 
	" messageType : 'sensor_msgs/Range'" + 
	"});" + 
	"listener.subscribe(function(message) {" + 
	"console.log('Received message :' + message.range);" + 
	"  sonar3 = (message.range);" + 
	"});listener = new ROSLIB.Topic({" + 
	"ros : ros," + 
	"name : '/' + ('sonar6')," + 
	" messageType : 'sensor_msgs/Range'" + 
	"});" + 
	"listener.subscribe(function(message) {" + 
	"console.log('Received message :' + message.range);" + 
	"  sonar6 = (message.range);" + 
	"});listener = new ROSLIB.Topic({" + 
	"ros : ros," + 
	"name : '/' + ('sonar1'), " + 
	" messageType : 'sensor_msgs/Range' " + 
	"});" + 
	"listener.subscribe(function(message) {" + 
	"console.log('Received message :' + message.range);" + 
  "sonar1 = (message.range);" + 
  "if ((sonar1 - 1) < 0) {" + 
  "if ((sonar3 - sonar6) < 0) {" + 
      "var twist = new ROSLIB.Message({" + 
      "linear : {" + 
      "x : 0.1," + 
      "y : 0," + 
      "z : 0" + 
      "}," + 
      "angular : {" + 
      "x : 0," + 
      "y : 0," + 
      "z : -0.2" + 
      "}" + 
      "});" + 
      "topic.publish(twist);" + 
    "} else {" + 
      "var twist = new ROSLIB.Message({" + 
      "linear : {" + 
      "x : 0.1," + 
      "y : 0," + 
      "z : 0" + 
      "}," + 
      "angular : {" + 
      "x : 0," + 
      "y : 0," + 
      "z : 0.2" + 
      "}" + 
      "});" + 
      "topic.publish(twist);" + 
    "}" + 
  "} else {" + 
    "var twist = new ROSLIB.Message({" + 
    "linear : {" + 
    "x : 0.3," + 
    "y : 0," + 
    "z : 0" + 
    "}," + 
    "angular : {" + 
    "x : 0," + 
    "y : 0," + 
    "z : 0" + 
    "}" + 
    "});" + 
    "topic.publish(twist);" + 
  "}" + 
"});";
return code;
};

/**
 * Bir ROS servisini çağırmayı sağlayan bloktur.
 * 
 * "rosrun rospy_tutorials add_two_ints_server" command should be run on the server
 */
Blockly.JavaScript['call_service'] = function(block) {
	var value_service_name = Blockly.JavaScript.valueToCode(block, 'service_name', Blockly.JavaScript.ORDER_ATOMIC);
	var value_service_type = Blockly.JavaScript.valueToCode(block, 'service_type', Blockly.JavaScript.ORDER_ATOMIC);
	var value_service_param_1 = Blockly.JavaScript.valueToCode(block, 'service_param_1', Blockly.JavaScript.ORDER_ATOMIC);
	var value_service_param_2 = Blockly.JavaScript.valueToCode(block, 'service_param_2', Blockly.JavaScript.ORDER_ATOMIC);
	var addTwoIntsClient = new ROSLIB.Service({
		ros : ros,
		name : '/' + value_service_name.substring(1, value_service_name.length - 1), //  add_two_ints
		serviceType : value_service_type.substring(1, value_service_type.length - 1)	//  rospy_tutorials/AddTwoInts
	});

	value_service_param_1 = parseInt(value_service_param_1);
	value_service_param_2 = parseInt(value_service_param_2);
	var request = new ROSLIB.ServiceRequest({
		a : value_service_param_1,
		b : value_service_param_2
	});

	addTwoIntsClient.callService(request, function(result) {
		console.log('Result for service call on ' + addTwoIntsClient.name + ': ' + result.sum);
		alert(result.sum);
	});
	var code = '';
	return code;
};

/**
 * ROS üzerinden bir parametrenin değerini almayı sağlayan bloktur.
 * 
 * "rosrun rosapi rosapi_node" command should be run on the server
 */
Blockly.JavaScript['get_param'] = function(block) {
	var value_param_name = Blockly.JavaScript.valueToCode(block, 'param_name', Blockly.JavaScript.ORDER_ATOMIC);
	var maxVelX = new ROSLIB.Param({
		ros : ros,
		name : value_param_name.substring(1, value_param_name.length - 1) // gazebo/gravity_x
	});
	maxVelX.get(function(value) {
		console.log(value_param_name.substring(1, value_param_name.length - 1) + ' value: ' + value);
	});
	var code = '';
	return code;
};

/**
 * ROS üzerinden bir parametrenin değerini değiştirmeyi sağlayan bloktur.
 *
 * "rosrun rosapi rosapi_node" command should be run on the server
 */
Blockly.JavaScript['set_param'] = function(block) {
	var value_param_name = Blockly.JavaScript.valueToCode(block, 'param_name', Blockly.JavaScript.ORDER_ATOMIC);
	var value_param_value = Blockly.JavaScript.valueToCode(block, 'param_value', Blockly.JavaScript.ORDER_ATOMIC);
	var maxVelX = new ROSLIB.Param({
		ros : ros,
		name : value_param_name.substring(1, value_param_name.length - 1) // gazebo/gravity_x
	});
	value_param_value = parseFloat(value_param_value);
	maxVelX.set(value_param_value);
	var code = '';
	return code;
};

/**
 * Robot üzerinde sonarların konumları
 * lidar'ın bulunduğu taraf arka olarak kabul edilmiştir.
 * sonar0: sağ ön
 * sonar1: ön
 * sonar2: sol ön
 * sonar3: sol
 * sonar4: sol arka
 * sonar5: sağ arka
 * sonar6: sağ
 */


