/**
 * ****************************************************************************
 * im_ros_codedblocks.js
 *
 * AMAÇ: Block factory kullanılmadan dinamik olarak kod ile oluşturulan blokların
 * bulundurulduğu sınıftır.
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
 * ROS üzerinde çalışan tüm topic'lerin alınıp, kullanıcıya seçenek olarak sunulması için
 *
 * bir bloğa konulduğu fonksiyondur.
 */
function getTopics() {
	/**
	 * ROS ile bağlantı sağlanmıştır.
	 */
	var ros = new ROSLIB.Ros({
		url : 'ws://localhost:9090'
	});
	ros.on('connection', function() {
		console.log('Connected to websocket server.');
	});
	ros.on('error', function(error) {
		console.log('Error connecting to websocket server: ', error);
	});
	ros.on('close', function() {
		console.log('Connection to websocket server closed.');
	});

	/**
	 * Topic'leri listeleyen servis çağırılarak, topic isimleri elde edilmiştir.
	 */
	var topicsClient = new ROSLIB.Service({
		ros : ros,
		name : '/rosapi/topics',
		serviceType : 'rosapi/Topics'
	});
	var request = new ROSLIB.ServiceRequest();
	topicsClient.callService(request, function(result) {
		var options = [];
		var option = [];
		for ( i = 0; i < result.topics.length; i++) {
			option.push(result.topics[i].substring(1));
			option.push(result.topics[i].substring(1));
			options.push(option);
			option = [];
		}

		/**
		 * ROS'tan alınan isimler bloğa eklenerek ekranda listelenmiştir.
		 */
		Blockly.Blocks['select_topic_name'] = {
			init : function() {
				this.appendDummyInput().appendField("SELECT TOPIC NAME : ").appendField(new Blockly.FieldDropdown(options), "dd_value_of");
				this.setOutput(true);
				this.setColour(330);
				this.setTooltip('');
				this.setHelpUrl('http://www.example.com/');
			}
		};

		/**
		 * Bloktan seçilen elemanın ismi geri döndürülmüştür.
		 */
		Blockly.JavaScript['select_topic_name'] = function(block) {
			var code = block.getFieldValue('dd_value_of');
			code = "'" + code + "'";
			return [code, Blockly.JavaScript.ORDER_NONE];
		};
	});
};

getTopics();


/**
 * Blockly'de yazılan kodların çalıştırılmasını sağlayan fonksiyondur.
 */
function run_code() {
	code = Blockly.JavaScript.workspaceToCode(workspace);
	console.log(code);
	eval(code);
}


/**
 * Blockly'de yazılan kodların yerel hafızaya kaydedilmesini sağlayan fonksiyondur.
 */
function save_code() {
	if ( typeof (Storage) !== "undefined") {
		var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		localStorage.setItem('data', Blockly.Xml.domToText(xml));
		console.log("backuped");
	} else {
		// Sorry! No web storage support..
	}
}

/**
 * Blockly'de yazılan kodların yerel hafızadan çekilmesini sağlayan fonksiyondur.
 */
function restore_code() {
	if ( typeof (Storage) !== "undefined") {
		if (localStorage.data != null) {
			var xml = Blockly.Xml.textToDom(localStorage.data);
			Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
			console.log("restored");
		}
	} else {
		// Sorry! No web storage support..
	}
}


