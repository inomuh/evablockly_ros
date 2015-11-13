/**
 * ****************************************************************************
 * im_ros_blocks.js
 *
 * AMAÇ: Sunucu üzerinde çalışan roscore'a bağlanmak ve ROS'u kullanmak için gerekli olan
 * publisher, subscriber, servis işlemleri ve parametre işlemleri için gerekli bloklar tanımlanmıştır.
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

/**
 * Web sayfası üzerinden roscore'a bağlanmayı sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#85y7nf
 */
Blockly.Blocks['connect_to_ros'] = {
	init : function() {
		this.appendDummyInput().appendField("CONNECT TO ROS");
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * Belirlenen pid parametrelerini uygulamayı sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2bgruf
 */
 Blockly.Blocks['set_pid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("SET PID PARAMETERS");
    this.appendDummyInput()
        .appendField("left wheel");
    this.appendValueInput("lkp")
        .setCheck("Number")
        .appendField("kp");
    this.appendValueInput("lkd")
        .setCheck("Number")
        .appendField("kd");
    this.appendValueInput("lki")
        .setCheck("Number")
        .appendField("ki");
    this.appendDummyInput()
        .appendField("right wheel");
    this.appendValueInput("rkp")
        .setCheck("Number")
        .appendField("kp");
    this.appendValueInput("rkd")
        .setCheck("Number")
        .appendField("kd");
    this.appendValueInput("rki")
        .setCheck("Number")
        .appendField("ki");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['create_publisher'] = {
	init : function() {
		this.appendDummyInput().appendField("CREATE PUBLISHER");
		this.appendValueInput("publisher_name").setCheck("String").appendField("topic name");
		this.appendValueInput("publisher_type").setCheck(null).appendField("publisher type");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * Publisher üzeriden veri basan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#z88gmh
 */
Blockly.Blocks['publish_data'] = {
	init : function() {
		this.appendDummyInput().appendField("PUBLISH DATA");
		this.appendValueInput("data").setCheck("String").appendField("publish");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * Belirlenen topic ismi ve tipi ile topic üzerinden verileri okumayı sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#d94uoz
 */
Blockly.Blocks['create_subscriber'] = {
	init : function() {
		this.appendDummyInput().appendField("CREATE SUBSCRIBER");
		this.appendValueInput("subscriber_name").setCheck("String").appendField("topic name");
		this.appendValueInput("subscriber_type").setCheck("String").appendField("subscriber type");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * Subscriber üzerinden veri okuyan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2ykzyn
 */
Blockly.Blocks['subscribe'] = {
	init : function() {
		this.appendDummyInput().appendField("SUBSCRIBE");
		this.appendStatementInput("statements");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};



/**
 * sensor_msgs/Range tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qpopf
 */
Blockly.Blocks['get_range_value'] = {
	init : function() {
		this.appendDummyInput().appendField("GET RANGE VALUE :").appendField(new Blockly.FieldDropdown([["header_seq", "header_seq"], ["header_stamp", "header_stamp"], ["radiation_type", "radiation_type"], ["header_frame_id", "header_frame_id"], ["field_of_view", "field_of_view"], ["min_range", "min_range"], ["max_range", "max_range"], ["range", "range"]]), "dd_value_of");
		this.setOutput(true);
		this.setColour(120);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * nav_msgs/Odometry tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#4xw7gz
 */
Blockly.Blocks['get_odom_value'] = {
	init : function() {
		this.appendDummyInput().appendField("GET ODOMETRY VALUE : ").appendField(new Blockly.FieldDropdown([["header_seq", "header_seq"], ["header_stamp", "header_stamp"], ["header_frame_id", "header_frame_id"], ["chield_frame_id", "chield_frame_id"], ["pose_position_x", "pose_position_x"], ["pose_position_y", "pose_position_y"], ["pose_position_z", "pose_position_z"], ["pose_orientation_x", "pose_orientation_x"], ["pose_orientation_y", "pose_orientation_y"], ["pose_orientation_z", "pose_orientation_z"], ["pose_orientation_w", "pose_orientation_w"], ["pose_covariance", "pose_covariance"], ["twist_linear_x", "twist_linear_x"], ["twist_linear_y", "twist_linear_y"], ["twist_linear_z", "twist_linear_z"], ["twist_angular_x", "twist_angular_x"], ["twist_angular_y", "twist_angular_y"], ["twist_angular_z", "twist_angular_z"], ["twist_covariance", "twist_covariance"]]), "dd_value_of");
		this.setOutput(true);
		this.setColour(120);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * impc_msgs/Bumper tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#iikvcr
 */
Blockly.Blocks['get_bumper_value'] = {
	init : function() {
		this.appendDummyInput().appendField("GET BUMPER VALUE :").appendField(new Blockly.FieldDropdown([["header_seq", "header_seq"], ["header_stamp", "header_stamp"], ["header_frame_id", "header_frame_id"], ["bumper0_state", "bumper0_state"], ["bumper1_state", "bumper1_state"], ["bumper2_state", "bumper2_state"]]), "dd_value_of");
		this.setOutput(true);
		this.setColour(120);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * rosgraph_msgs/Clock tipinde yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#cjho6z
 */
Blockly.Blocks['get_clock_value'] = {
	init : function() {
		this.appendDummyInput().appendField("GET CLOCK VALUE : ").appendField(new Blockly.FieldDropdown([["clock_secs", "clock_secs"], ["clock_nsecs", "clock_nsecs"]]), "dd_value_of");
		this.setOutput(true);
		this.setColour(120);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * Herhangi bir tipte yayın yapan bir düğümden istenilen verinin seçilip alınmasını sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qw2g4
 */
Blockly.Blocks['get_custom_value'] = {
	init : function() {
		this.appendDummyInput().appendField("GET CUSTOM VALUE : ").appendField(new Blockly.FieldTextInput(""), "dd_value_of");
		this.setOutput(true);
		this.setColour(120);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * geometry_msgs/Twist tipinde veri basmayı sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9yomv7
 */
Blockly.Blocks['cmd_vel'] = {
	init : function() {
		this.appendDummyInput().appendField("CMD_VEL");
		this.appendDummyInput().appendField("linear");
		this.appendValueInput("linear_x").setCheck("Number").appendField("x");
		this.appendValueInput("linear_y").setCheck("Number").appendField("y");
		this.appendValueInput("linear_z").setCheck("Number").appendField("z");
		this.appendDummyInput().appendField("angular");
		this.appendValueInput("angular_x").setCheck("Number").appendField("x");
		this.appendValueInput("angular_y").setCheck("Number").appendField("y");
		this.appendValueInput("angular_z").setCheck("Number").appendField("z");
		this.setOutput(true);
		this.setColour(120);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * Klavyenin yön tuşlarına göre robotu süren blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#w4negk
 */
Blockly.Blocks['teleop'] = {
	init : function() {
		this.appendDummyInput().appendField("TELEOP");
		this.appendDummyInput().appendField("This block is a teleop publisher");
		this.appendDummyInput().appendField("You can control the robot with");
		this.appendDummyInput().appendField("direction keys.");
		this.appendDummyInput().appendField("up arrow : move forward");
		this.appendDummyInput().appendField("down arrow : move back");
		this.appendDummyInput().appendField("right arrow : turn right");
		this.appendDummyInput().appendField("left arrow : turn left");
		this.appendDummyInput().appendField("spacebar : stop");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(20);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * Wander modda gezinmeyi sağlayan blok oluşturulmuştur.
 * 
 * Bloğun bulunduğu link : https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#i988e9
 */
 Blockly.Blocks['wander'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("WANDER");
    this.appendDummyInput()
        .appendField("In this mode robot autonomously ");
    this.appendDummyInput()
        .appendField("wanders around avoiding obstacles.");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

/**
 * Bir ROS servisini çağırmayı sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#38ikhr
 */
Blockly.Blocks['call_service'] = {
	init : function() {
		this.appendDummyInput().appendField("CALL SERVICE");
		this.appendValueInput("service_name").setCheck("String").appendField("service name");
		this.appendValueInput("service_type").setCheck("String").appendField("service type");
		this.appendValueInput("service_param_1").setCheck("Number").appendField("number 1");
		this.appendValueInput("service_param_2").setCheck("Number").appendField("number 2");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * ROS üzerinden bir parametrenin değerini almayı sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#f8qwju
 */
Blockly.Blocks['get_param'] = {
	init : function() {
		this.appendDummyInput().appendField("GET PARAM");
		this.appendValueInput("param_name").setCheck("String").appendField("parameter name");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

/**
 * ROS üzerinden bir parametrenin değerini değiştirmeyi sağlayan blok oluşturulmuştur.
 *
 * Bloğun bulunduğu link : blockly-demo.appspot.com/static/demos/blockfactory/index.html#jtikqg
 */
Blockly.Blocks['set_param'] = {
	init : function() {
		this.appendDummyInput().appendField("SET PARAM");
		this.appendValueInput("param_name").setCheck("String").appendField("parameter name");
		this.appendValueInput("param_value").setCheck("Number").appendField("parameter value");
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(330);
		this.setTooltip('');
		this.setHelpUrl('http://www.example.com/');
	}
};

