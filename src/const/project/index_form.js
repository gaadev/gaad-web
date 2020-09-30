export default {
    "column": [],
    "labelPosition": "left",
    "labelSuffix": "：",
    "labelWidth": 120,
    "gutter": 40,
    "menuBtn": true,
    "submitBtn": true,
    "submitText": "提交",
    "emptyBtn": true,
    "emptyText": "清空",
    "menuPosition": "center",
    "tabs": false,
    "detail": false,
    "group": [
        {
            "label": "项目基础信息",
            "prop": "1601436683216_45144",
            "arrow": false,
            "collapse": true,
            "display": true,
            "column": [
                {
                    "type": "input",
                    "label": "项目名称",
                    "span": 12,
                    "display": true,
                    "prop": "projectName",
                    "required": true,
                    "rules": [
                        {
                            "required": true,
                            "message": "项目名称必须填写"
                        }
                    ]
                },
                {
                    "type": "input",
                    "label": "应用标识",
                    "span": 12,
                    "display": true,
                    "prop": "project_code",
                    "rules": [
                        {
                            "required": true,
                            "message": "应用标识必须填写"
                        }
                    ],
                    "required": true
                },
                {
                    "type": "select",
                    "label": "状态",
                    "dicData": [
                        {
                            "label": "正常",
                            "value": 0
                        },
                        {
                            "label": "禁止",
                            "value": 1
                        },
                        {
                            "label": "删除",
                            "value": "3"
                        }
                    ],
                    "cascaderItem": [],
                    "span": 12,
                    "display": true,
                    "props": {
                        "label": "label",
                        "value": "value"
                    },
                    "prop": "status",
                    "value": 0
                },
                {
                    "type": "textarea",
                    "label": "描述信息",
                    "span": 24,
                    "display": true,
                    "prop": "descript"
                }
            ]
        },
        {
            "label": "git仓库配置",
            "prop": "git",
            "arrow": true,
            "collapse": true,
            "display": true,
            "column": [
                {
                    "type": "input",
                    "label": "账号",
                    "span": 12,
                    "display": true,
                    "prop": "1601436865614_52539",
                    "required": true,
                    "rules": [
                        {
                            "required": true,
                            "message": "账号必须填写"
                        }
                    ]
                },
                {
                    "type": "password",
                    "label": "密码",
                    "span": 12,
                    "display": true,
                    "prop": "gitpassword",
                    "rules": [
                        {
                            "required": true,
                            "message": "密码必须填写"
                        }
                    ],
                    "required": true
                }
            ]
        }
    ]
}