/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

importScript("Dimension.js");
importScript("qb/ESQuery.js");

if (!Mozilla) var Mozilla = {"name": "Mozilla", "edges": []};

Dimension.addEdges(true, Mozilla, [
	{"name": "B2G",
		"esfilter": {"or": [
			{"terms": {"cf_blocking_b2g": ["1.3+", "1.4+", "1.3t+", "1.5+", "1.3?", "1.4?", "1.3t?", "1.5?", "2.0+", "2.0?", "2.1+", "2.1?", "2.2+", "2.2?", "3.0+", "3.0?", "backlog"]}},
			{"term": {"product": "core"}},
			{"term": {"product": "firefox os"}}
		]},
		"edges": [
			{"name": "Nominations", "index": "bugs", "esfilter": {"terms": {"cf_blocking_b2g": ["1.3?", "1.4?", "1.3t?", "1.5?", "2.0?", "2.1?", "2.2?", "3.0?"]}}},
			{"name": "Blockers", "index": "bugs", "esfilter": {"terms": {"cf_blocking_b2g": ["1.3+", "1.4+", "1.3t+", "1.5+", "2.0+", "2.1+", "2.2+", "3.0+"]}}},
			{"name": "Bugs", "index": "bugs", "esfilter": {"not": {"terms": {"cf_feature_b2g": ["2.0", "2.1", "2.2", "2.2?", "2.2+", "3.0?", "3.0+"]}}}},
			{"name": "Features", "index": "bugs", "esfilter": {"terms": {"cf_feature_b2g": ["2.0", "2.1", "2.2", "2.2?", "2.2+", "3.0?", "3.0+"]}}},
			{"name": "Regressions", "index": "bugs", "esfilter": {"term": {"keywords": "regression"}}},
                        {"name": "Verifyme", "index": "bugs", "esfilter": {"term": {"keywords": "verifyme"}}},
                        //{"name": "HasQAWhiteboard", "index": "bugs", "esfilter": {"exists": {"field":"cf_qa_whiteboard"}}},
                        {"name": "HasQAWhiteboard", "index": "bugs", "esfilter": {"regexp": {"cf_qa_whiteboard":".*COM=.*"}}},
			{"name": "Unassigned", "index": "bugs", "esfilter": {"term": {"assigned_to": "nobody@mozilla.org"}}},
			{"name": "Responsibility", "index": "bugs", "isFacet": true, "partitions": [
				{"name":"FFOS Team", "esfilter":{"not":{"terms":{"status_whiteboard.tokenized":["NPOTB", "POVB"]}}}},
				{"name":"Vendor (POVB)", "esfilter":{"term":{"status_whiteboard.tokenized":"POVB"}}},
				{"name":"Not Part of the Build (NPOTB)", "esfilter":{"term":{"status_whiteboard.tokenized":"NPOTB"}}}
			]},

			{"name": "CA Blocker", "index": "bug-hierarchy", "esfilter":{"term":{"blocked_by":984663}}},

			//AN UNFORTUNATE DISTINCTION BETWEEN DIMENSIONS (ABOVE, THAT OVERLAP), AND PARTITIONS THAT DO NOT OVERLAP
			{"name": "State", "index": "bugs", "isFacet": true,
				"partitions": [
					{"name": "Nominated", "esfilter": {"and": [
						{"terms": {"cf_blocking_b2g": ["1.3?", "1.4?", "1.3t?", "1.5?", "2.0?", "2.1?", "2.2?", "3.0?"]}},
						{"not": {"term": {"keywords": "regression"}}}
					]}},
					{"name": "Blocker", "esfilter": {"and": [
						{"terms": {"cf_blocking_b2g": ["1.3+", "1.4+", "1.3t+", "1.5+", "2.0+", "2.1+", "2.2+", "3.0+"]}},
						{"not": {"term": {"keywords": "regression"}}}
					]}},
					{"name": "Regression", "esfilter": {"term": {"keywords": "regression"}}}
				]
			},



			/*{"name": "Component",
				"field": "component",
				"type": "set",
				"esfilter": ESQuery.TrueFilter,
				"index":"bugs",
				"limit":200,
				"end": function (p) {
					return p.name;
				}
			},*/

                        {"name": "Component","isFacet": true, "partitions":[
                               {"name": "Bluetooth", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Bluetooth.*"}}
                               ]}},
                               {"name": "Gaia::Calendar", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Calendar.*"}}
                               ]}},
                               {"name": "Gaia::Camera", "esfilter":{ "or": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Camera.*"}}
                               ]}},
                               {"name": "Gaia::Clock", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Clock.*"}}
                               ]}},
                               {"name": "Gaia::Contacts", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Contacts.*"}}
                               ]}},
                               {"name": "Gaia::Cost Control", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Cost Control.*"}}
                               ]}},
                               {"name": "Gaia::Dialer", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Dialer.*"}}
                               ]}},
                               {"name": "Gaia::E-Mail", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::E-Mail.*"}}
                               ]}},
                               {"name": "Gaia::FTU", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::FTU.*"}}
                               ]}},
                               {"name": "Gaia::FMRadio", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::FMRadio.*"}}
                               ]}},
                               {"name": "Gaia::Gallery", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Gallery.*"}}
                               ]}},
                               {"name": "Gaia::Homescreen", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Homescreen.*"}}
                               ]}},
                               {"name": "Gaia::Keyboard", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Keyboard.*"}}
                               ]}},
                               {"name": "Gaia::Music", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Music.*"}}
                               ]}},
                               {"name": "Gaia::Ringtones", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Ringtones.*"}}
                               ]}},
                               {"name": "Gaia::Search", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Search.*"}}
                               ]}},
                               {"name": "Gaia::Settings", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Settings.*"}}
                               ]}},
                               {"name": "Gaia::SMS", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::SMS.*"}}
                               ]}},
                               {"name": "Gaia::System", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::System.*"}}
                               ]}},
                               {"name": "Gaia::System::Lockscreen", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::System::Lockscreen.*"}}
                               ]}},
                               {"name": "Gaia::System::Window Mgmt", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::System::Window Mgmt.*"}}
                               ]}},
                               {"name": "Gaia::Video", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Gaia::Video.*"}}
                               ]}},
                               {"name": "MTP/UMS", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=MTP/UMS.*"}}
                               ]}},
                               {"name": "NFC", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=NFC.*"}}
                               ]}},
                               {"name": "OTA", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=OTA.*"}}
                               ]}},
                               {"name": "Privacy Panel", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Privacy Panel.*"}}
                               ]}},
                               {"name": "RIL", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=RIL.*"}}
                               ]}},
                               {"name": "Storage", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Storage.*"}}
                               ]}},
                               {"name": "SystemPlatform", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=SystemPlatform.*"}}
                               ]}},
                               {"name": "Text Selection", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Text Selection.*"}}
                               ]}},
                               {"name": "Wifi", "esfilter":{ "and": [
                                        {"regexp":{"cf_qa_whiteboard":".*COM=Wifi.*"}}
                               ]}}
		        ]},

			{"name":"Team", "isFacet": true, "partitions":[
				{"name":"Performance",
					"esfilter":{"or":[
						{"term":{"keywords":"perf"}},
						{"and":[
							{"term":{"product": "firefox os"}},
							{"term":{"component":"performance"}}
						]}
					]}
				},
				{"name":"System Front-End", "esfilter":{"and":[
					{"not":{"term":{"keywords":"perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"term": {"product": "firefox os"}},
					{"terms":{"component":[
						"gaia::browser",
						"gaia::everything.me",
						"gaia::first time experience",
						"gaia::homescreen",
						"gaia::search",
						"gaia::system",
						"gaia::system::browser chrome"
					]}}
				]}},
				{"name": "Productivity", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"term": {"product": "firefox os"}},
					{"terms": {"component": [
						"gaia::e-mail",
						"gaia::clock",
						"gaia::calculator",
						"gaia::calendar",
						"gaia::notes"
					]}}
				]}},
				{"name": "Media", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"term": {"product": "firefox os"}},
					{"terms": {"component": [
						"gaia::camera",
						"gaia::fmradio",
						"gaia::gallery",
						"gaia::music",
						"gaia::video"
					]}}
				]}},
				{"name": "RIL", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"terms": {"component": [
						"ril",
						"nfc",
						"wifi",
						"rtsp"
					]}}
				]}},
				{"name": "System Platform", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"term": {"product": "firefox os"}},
					{"terms": {"component": [
						"gaia::settings",
						"gaia::system::window mgmt",
						"gaia::keyboard",
						"gaia::system::input mgmt",
						"gaia::system::lockscreen"
					]}}
				]}},
				{"name": "Multi-media Platform", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"terms": {"component": [
						"video/audio: recording",
						"video/audio",
						"webrtc",
						"webrtc: video/audio",
						"webrtc: audio/video"
					]}}
				]}},
				{"name": "Comms", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"term": {"product": "firefox os"}},
					{"terms": {"component": [
						"dom: contacts",
						"gaia::contacts",
						"gaia::cost control",
						"gaia::dialer",
						"gaia::sms"
					]}}
				]}},
				{"name": "Devices", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"term": {"product": "firefox os"}},
					{"terms": {"component": [
						"audiochannel",
						"bluetooth",
						"hardware",
						"vendcom"
					]}}
				]}},

				{"name": "Networking (Necko)", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"terms": {"component": [
						"Networking".toLowerCase(),
						"networking: cache",
						"networking: http",
						"networking: websockets"
					]}}
				]}},
				{"name":"WebRTC",
					"esfilter":{"or":[
						{"and":[
							{"term":{"product":"loop"}},
							{"term":{"component":"general"}}
						]},
						{"and":[
							{"term":{"product":"loop"}},
							{"term":{"component":"client"}}
						]},
						{"and":[
							{"term":{"product":"loop"}},
							{"term":{"component":"server"}}
						]},
						{"and":[
							{"term":{"product":"core"}},
							{"prefix":{"component":"webrtc"}}
						]}
					]}
				},
				{"name": "Layout", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"terms": {"component": [
						"CSS Parsing and Computation".toLowerCase(),
						"Layout".toLowerCase()
					]}}
				]}},

				{"name": "Javascript", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"terms": {"component": [
						"JavaScript Engine".toLowerCase(),
						"JavaScript: GC".toLowerCase(),
						"javascript engine: jit"
					]}}
				]}},

				{"name": "DOM", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"terms": {"component": [
						"dom".toLowerCase(),
						"dom: apps".toLowerCase(),
						"dom: events".toLowerCase(),
						"dom: devices interfaces".toLowerCase(),
						"dom: push notifications".toLowerCase(),
						"dom: device interfaces"
					]}}
				]}},

				{"name": "Graphics", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}}, //AN UNFORTUNATE REDUNDANCY
					{"terms": {"component": [
						"Graphics".toLowerCase(),
						"Graphics: Layers".toLowerCase(),
						"Graphics: text".toLowerCase(),
						"Canvas: 2D".toLowerCase(),
						"Canvas: WebGL".toLowerCase(),
						"ImageLib".toLowerCase(),
						"Panning and Zooming".toLowerCase()
					]}}
				]}},



				{"name": "All Others", "esfilter": {"and": [
					{"not": {"term": {"keywords": "perf"}}},     //AN UNFORTUNATE REDUNDANCY
					{"not": {"term":{"product":"loop"}}},        //NO WebRTC Loop Product
					{"not": {"prefix":{"component":"webrtc"}}},  //NO WebRTC
					{"not": {"terms": {"component": [
						//AN UNFORTUNATE LIST OF EVERYTHING, SHOULD BE AUTO-GENERATED, BUT I NEED A EQUATION SIMPLIFIER, OR ELSE I BREAK ES
						"Canvas: 2D".toLowerCase(),
						"Canvas: WebGL".toLowerCase(),
						"CSS Parsing and Computation".toLowerCase(),
						"dom".toLowerCase(),
						"dom: apps".toLowerCase(),
						"dom: events".toLowerCase(),
						"dom: devices interfaces".toLowerCase(),
						"dom: push notifications".toLowerCase(),
						"dom: device interfaces",
						"Graphics".toLowerCase(),
						"Graphics: Layers".toLowerCase(),
						"Graphics: text".toLowerCase(),
						"Hardware Abstraction Layer (HAL)".toLowerCase(),
						"ImageLib".toLowerCase(),
						"IPC".toLowerCase(),
						"JavaScript Engine".toLowerCase(),
						"JavaScript: GC".toLowerCase(),
						"Layout".toLowerCase(),
						"MFBT".toLowerCase(),
						"Networking".toLowerCase(),
						"Panning and Zooming".toLowerCase(),
						"performance",
						"gaia::browser",
						"gaia::everything.me",
						"gaia::first time experience",
						"gaia::homescreen",
						"gaia::search",
						"gaia::system",
						"gaia::system::browser chrome",
						"gaia::e-mail",
						"gaia::clock",
						"gaia::calculator",
						"gaia::calendar",
						"gaia::notes",
						"gaia::camera",
						"gaia::fmradio",
						"gaia::gallery",
						"gaia::music",
						"gaia::video",
						"ril",
						"nfc",
						"wifi",
						"rtsp",
						"gaia::settings",
						"gaia::system::window mgmt",
						"gaia::keyboard",
						"gaia::system::input mgmt",
						"gaia::system::lockscreen",
						"video/audio: recording",
						"video/audio",
						"webrtc",
						"webrtc: video/audio",
						"webrtc: audio/video",
						"dom: contacts",
						"gaia::contacts",
						"gaia::cost control",
						"gaia::dialer",
						"gaia::sms",
						"audiochannel",
						"bluetooth",
						"hardware",
						"vendcom",
						"javascript engine: jit",
						"networking: cache",
						"networking: http",
						"networking: websockets"
					]}}}
				]}}
			]},

			{"name": "Project", "index": "bugs", "isFacet": true,
				"partitions": [
					//https://wiki.mozilla.org/Release_Management/B2G_Landing
					{"name": "1.3",
						"dateMarks":[
							{"name":"FC", "date":"Dec 9, 2013", "style":{strokeStyle:"black", verticalOffset: 10}},
							{"name":"CF", "date":"Mar 17, 2014", "style":{strokeStyle:"black", verticalOffset: 10}}
						],
						"style": {"color": "#d62728"},
						"esfilter": {"terms": {"cf_blocking_b2g": ["1.3+", "1.3?"]}}
					},
					{"name": "1.3T",
						"dateMarks":[
							{"name":"FC", "date":"Dec 9, 2013", "style":{strokeStyle:"black", verticalOffset: 20}},
							{"name":"CF", "date":"Mar 17, 2014", "style":{strokeStyle:"black", verticalOffset: 20}}
						],
						"style": {"color": "#ff7f0e"},
						"esfilter": {"terms": {"cf_blocking_b2g": ["1.3t+", "1.3t?"]}}
					},
					{"name": "1.4",
						"dateMarks":[
							{"name":"FC", "date":"Mar 17, 2014", "style":{strokeStyle:"black", verticalOffset: 30}},
							{"name":"SC", "date":"Apr 28, 2014", "style":{strokeStyle:"black", verticalOffset: 30}},
							{"name":"CF", "date":"Jun 9, 2014", "style":{strokeStyle:"black", verticalOffset: 30}}
						],
						"style": {"color": "#2ca02c"},
						"esfilter": {"terms": {"cf_blocking_b2g": ["1.4+", "1.4?"]}}
					},
					{"name": "2.0",
						"dateMarks":[
							{"FC":"Jun 9, 2014"},
							{"SC":"Jul 21, 2014"},
							{"CF":"Sep 01, 2014"}
						],
						"style": {"color": "#1f77b4"},
						"esfilter": {"terms": {"cf_blocking_b2g": ["1.5+", "1.5?", "2.0+", "2.0?"]}}
					},
					{"name": "2.1",
                                                "dateMarks":[
                                                        {"FC":"Sep 01, 2014"},
                                                        {"SC":"Oct 13, 2014"},
                                                        {"CF":"Nov 21, 2014"}
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_blocking_b2g": ["2.1+", "2.1?"]}}
                                        },
					{"name": "2.2",
                                                "dateMarks":[
                                                        {"FC":"Nov 21, 2014"},//??
                                                        {"SC":"Dec 13, 2014"},//??
                                                        {"CF":"Jan 21, 2015"}//??
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_blocking_b2g": ["2.2+", "2.2?"]}}
                                        },
                                        {"name": "3.0",
                                                "dateMarks":[
                                                        {"FC":"Dec 31, 2015"},//??
                                                        {"SC":"Dec 31, 2014"},//??
                                                        {"CF":"Dec 31, 2015"}//??
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_blocking_b2g": ["3.0+", "3.0?"]}}
                                        },
					{"name": "Backlog", 
                                                "style": {"color": "#9467bd"}, 
                                                "esfilter": {"term": {"cf_blocking_b2g": "backlog"}}
                                        },
					{"name": "Other", 
						"style": {"color": "#9467bd"}, 
						"esfilter": {"and": [{"not": {"terms": {"cf_blocking_b2g": ["1.3+", "1.4+", "1.3t+", "1.5+", "1.3?", "1.4?", "1.3t?", "1.5?", "2.0+", "2.0?", "2.1+", "2.1?", "2.2+", "2.2?","3.0+","3.0?", "backlog"]}}}
					]}}
				]
			},

			{"name": "ProjectFeature", "index": "bugs", "isFacet": true,
                                "partitions": [
                                        //https://wiki.mozilla.org/Release_Management/B2G_Landing
                                        {"name": "2.0",
                                                "dateMarks":[
                                                        {"FC":"Jun 9, 2014"},
                                                        {"SC":"Jul 21, 2014"},
                                                        {"CF":"Sep 01, 2014"}
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_feature_b2g": ["2.0"]}}
                                        },
                                        {"name": "2.1",
                                                "dateMarks":[
                                                        {"FC":"Sep 01, 2014"},
                                                        {"SC":"Oct 13, 2014"},
                                                        {"CF":"Nov 21, 2014"}
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_feature_b2g": ["2.1"]}}
                                        },
					{"name": "2.2",
                                                "dateMarks":[
                                                        {"FC":"Nov 21, 2014"},//?
                                                        {"SC":"Dec 13, 2014"},//?
                                                        {"CF":"Jan 21, 2014"} //?
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_feature_b2g": ["2.2", "2.2?", "2.2+"]}}
                                        },
                                        {"name": "3.0",
                                                "dateMarks":[
                                                        {"FC":"Nov 21, 2015"},//?
                                                        {"SC":"Dec 13, 2015"},//?
                                                        {"CF":"Jan 21, 2015"} //?
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_feature_b2g": ["3.0", "3.0?", "3.0+"]}}
                                        }
                                        //{"name": "Other", "style": {"color": "#9467bd"}, "esfilter": {"and": [
                                        //        {"not": {"terms": {"cf_feature_b2g": ["2.0", "2.1", "2.2", "2.2?", "2.2+"]}}}
                                        //]}}
                                ]
                        },

			{"name": "FinalState", "index": "bugs", "isFacet": true,
				"partitions": [
					{"name": "1.3",
						"dateMarks":[
							{"name":"FC", "date":"Dec 9, 2013", "style":{strokeStyle:"black", verticalOffset: 10}},
							{"name":"CF", "date":"Mar 17, 2014", "style":{strokeStyle:"black", verticalOffset: 10}}
						],
						"style": {"color": "#d62728"},
						"esfilter": {"term": {"cf_blocking_b2g": "1.3+"}}
					},
					{"name": "1.3T",
						"dateMarks":[
							{"name":"FC", "date":"Dec 9, 2013", "style":{strokeStyle:"black", verticalOffset: 20}},
							{"name":"CF", "date":"Mar 17, 2014", "style":{strokeStyle:"black", verticalOffset: 20}}
						],
						"style": {"color": "#ff7f0e"},
						"esfilter": {"term": {"cf_blocking_b2g": "1.3T+"}}},
					{"name": "1.4",
						"style": {"color": "#2ca02c"},
						"esfilter": {"term": {"cf_blocking_b2g": "1.4+"}},
						"dateMarks":[
							{"name":"FC", "date":"Mar 17, 2014", "style":{strokeStyle:"black", verticalOffset: 30}},
							{"name":"SC", "date":"Apr 28, 2014", "style":{strokeStyle:"black", verticalOffset: 30}},
							{"name":"CF", "date":"Jun 9, 2014", "style":{strokeStyle:"black", verticalOffset: 30}}
						]
					},
					{"name": "2.0",
						"dateMarks":[
							{"FC":"Jun 9, 2014"},
							{"SC":"Jul 21, 2014"},
							{"CF":"Sep 01, 2014"}
						],
						"style": {"color": "#1f77b4"},
						"esfilter": {"terms": {"cf_blocking_b2g": ["1.5+", "2.0+"]}}
					},
					{"name": "2.1",
                                                "dateMarks":[
                                                        {"FC":"Sep 01, 2014"},
                                                        {"SC":"Oct 13, 2014"},
                                                        {"CF":"Nov 21, 2014"}
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_blocking_b2g": "2.1+"}}
                                        },
					{"name": "2.2",
                                                "dateMarks":[
                                                        {"FC":"Nov 21, 2014"},//?
                                                        {"SC":"Dec 13, 2014"},//?
                                                        {"CF":"Jan 21, 2015"}//?
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_blocking_b2g": "2.2+"}}
                                        },
                                        {"name": "3.0",
                                                "dateMarks":[
                                                        {"FC":"Nov 21, 2015"},//?
                                                        {"SC":"Dec 13, 2015"},//?
                                                        {"CF":"Dec 13, 2015"}//?
                                                ],
                                                "style": {"color": "#1f77b4"},
                                                "esfilter": {"terms": {"cf_blocking_b2g": "3.0+"}}
                                        },
					{"name": "Targeted",
						"style": {"color": "#9467bd", "visibility":"hidden"},
						"esfilter": {"and": [
							{"exists": {"field": "target_milestone"}},
							{"not": {"term": {"target_milestone": "---"}}}
						]}
					},
					{"name": "Others", "style": {"color": "#dddddd", "visibility":"hidden"}, "esfilter": {"match_all": {}}}
				]
			}
		]
	}
]);

