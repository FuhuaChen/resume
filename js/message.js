!function () {
    let view = document.querySelector('section.message')
    let model = {
        init:function () {
            let APP_ID = 'wL9EmIy9VKiLGVLsdaJuz1Ye-gzGzoHsz'
            let APP_KEY = 'NByNI3HSVItXElyGsReUrdTo'

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
        },
        fetch:function () {
            let query = new AV.Query('Message')
            return query.find()
        },
        save:function (name,content) {
            let Message = AV.Object.extend('Message')
            let message = new Message()
            message.set('name',name)
            message.set('content',content)
            return message.save()
        }
    }
    let controller = {
        view:null,
        model:null,
        messageList:null,
        init:function (view,model) {
            this.view = view
            this.model = model
            this.messageList = document.querySelector('.message > ol')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        bindEvents:function () {
            let myForm = this.view.querySelector('#postMessageForm')
            myForm.addEventListener('submit', (e)=>{
                e.preventDefault()
                this.saveMessage()
            })
        },
        loadMessages:function () {
            this.model.fetch().then( (messages)=>{
                messages.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.attributes.name}:${item.attributes.content}`
                    this.messageList.insertBefore(li,this.messageList.firstChild)
                })
                return AV.Object.saveAll(Message)
            }).then(function(object) {
                //成功
            }, function (error) {
                // 异常处理
            })
        },
        saveMessage:function () {
            let name = document.querySelector('input[name=name]').value
            let content = document.querySelector('input[name=content]').value
            this.model.save(name,content).then((object)=>{
                if(name!==''&&content!==''){
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`
                    this.messageList.insertBefore(li,this.messageList.firstChild)
                    document.querySelector('input[name=content]').value = ''
                }
            }, function (error) {
                console.error(error)
            })
        }
    }
    controller.init(view,model)
}.call()