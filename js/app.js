
const colourMap={
    0:'',
    1:'gary',
    2:'blue',
    3:'green',
    4:'yellow',
    5:'red',
    6:'pro',
    7:'orange',
    8:'aqua'
}

class Block{
    constructor(type,origin={x:0,y:0}){
        let shapeMap={
            'I':[
                [0,0,0,0],
                [2,2,2,2],
                [0,0,0,0],
                [0,0,0,0],
            ],
            'Z':[
                [3,3,0],
                [0,3,3],
                [0,0,0],

            ],
            'L':[
                [0,4,0],
                [0,4,0],
                [0,4,4],
            ],
            'O':[
                [5,5],
                [5,5],

            ],
            'T':[
                [0,0,0],
                [6,6,6],
                [0,6,0],
            ],
            'AL':[
                [0,7,0],
                [0,7,0],
                [7,7,0],
            ],
            'AZ':[
                [0,8,8],
                [8,8,0],
                [0,0,0],

            ],
        }
        this.origin=origin
        if(type){
            this.block=shapeMap[type]
        }else{
            this.block=this.getRandom(shapeMap)
            let i=0;
            while (i<Math.floor(Math.random()*4)) {
                this.rotate()
            }
        }
        //

    }
    getRandom(shapeMap){
        //debugger
        let random=Math.floor(Math.random()*7)
        let key=Object.keys(shapeMap)[random]

        return shapeMap[key]
    }
    rotate(){
        if(this.origin.x+this.block.length>20){
            return
        }
        var res=[]
        this.block.forEach((i,ind)=>{
            i.forEach((k,knd)=>{
                if(!res[knd]){
                    res[knd]=[]
                }
                res[knd][i.length-1-ind]=k
            })
        })
        this.block=res
        if(this.origin.y<0){
            this.origin.y=0
        }
        //debugger
        if(this.origin.y+this.block[0].length>10){
            this.origin.y=10-this.block[0].length
        }

    }
}
class Game{
    constructor(container){
        this.wrap=container;
        this.container=[
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
        ];
        this.speed=0.5;
        this.nextContainer=[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    }
    initGame(){
        let html='';
        //debugger
        //console.log(this.container)
        this.container.forEach(i=>{

            i.forEach(k=>{

                html+=`<div class="cell ${colourMap[k]}"></div>`
            })
        })
        this.wrap.innerHTML=html

    }
    initNext(){
        let html='';
        this.next=new Block()
        this.nextContainer.forEach((i,ind)=>{
            i.forEach((k,knd)=>{
                this.nextContainer[ind][knd]=0
            })
        })
        //debugger
        this.next.block.forEach((i,ind)=>{
            i.forEach((k,knd)=>{
                if(k!==0){
                    this.nextContainer[ind][knd]=k
                }
            })
        })
        this.nextContainer.forEach(i=>{
            i.forEach(k=>{
                html+=`<div class="cell ${colourMap[k]}"></div>`
            })
        })
        //todo :硬编码
        document.querySelector('#next').innerHTML=html
    }
    end(){

        clearInterval(this.timer)
        let mask=document.querySelector('.mask')
        mask.innerHTML='YOU FUCKED!!<p>RESTATR</p>'
        mask.className='mask';




    }
    reSetAll(){
        this.container.forEach((i,ind)=>{
            i.forEach((k,knd)=>{
                if(k!==0){
                    this.container[ind][knd]=0
                }
            })
        })
        this.nextContainer.forEach((i,ind)=>{
            i.forEach((k,knd)=>{
                if(k!==0){
                    this.container[ind][knd]=0
                }
            })
        })
    }
    keyEvent(e){


        if(e.key==='s'){
            this.down()
        }
        if(e.key==='a'){
            this.left()
        }
        if(e.key==='d'){
            this.right()
        }
        if(e.key==='w'){
            this.reSetBlock()
            this.curr.rotate()


            this.refView()
        }
    }
    start(){
        //this.reSetAll()

        this.initNext()
        this.curr=new Block()
        this.refView()
        this.timer=setInterval(()=>{
            this.down()
        },this.speed*1000)

        window.addEventListener('keydown',this.keyEvent.bind(this))

    }
    reStart(){
        this.reSetAll()

        this.initNext()
        this.curr=new Block()
        this.refView()
        this.timer=setInterval(()=>{
            this.down()
        },this.speed*1000)
    }
    pause(){
        clearInterval(this.timer)
    }
    refView(){
        // this.curr.block.forEach((i,indexX)=>{
        //     i.forEach((k,indexY)=>{
        //
        //         this.container[indexX+this.curr.origin.x][indexY+this.curr.origin.y]=flag?flag:k
        //         //debugger
        //     })
        // })
        this.blockToWrap(this.curr.origin,'view')
        this.initGame()
    }
    reSetBlock(){
        //this.refView('reset')
        //debugger
        this.curr.block.forEach((i,indexX)=>{
            i.forEach((k,indexY)=>{
                if(k!==0){
                    this.container[indexX+this.curr.origin.x][indexY+this.curr.origin.y]=0

                }



            })
        })
    }
    //方块数据放到容器中
    blockToWrap(origin,flag){
        //debugger
        try{
            //debugger
            this.curr.block.forEach((i,indexX)=>{
                i.forEach((k,indexY)=>{
                    // if(indexX+origin.x>19){
                    //     debugger
                    //     throw new Error('stop')
                    // }
                    if(k!==0){
                        if(this.container[indexX+origin.x][indexY+origin.y]===0||this.container[indexX+origin.x][indexY+origin.y]===k||k===1){
                            if(flag){
                                this.container[indexX+origin.x][indexY+origin.y]=k
                            }

                        }else{
                            throw new Error()
                        }


                    }


                })
            })
            return true
        }catch (e){

            return false
        }

    }
    //移动检查（把下一步的坐标输入）检查是否报错
    moveCheck(pon){
        let origin={
            x:this.curr.origin.x,
            y:this.curr.origin.y,
        };
        switch (pon){
            case 'x':
                origin.x++
                break;
            case 'y+':
                origin.y++;
                break
            case 'y-':
                origin.y--;
                break

        }
       // origin[pon]++
        let res=this.blockToWrap(origin)
        if(res===false){
            return false
        }
        if(res==='stop'){
            return "stop"
        }
        return true

        // try{
        //     this.blockToWrap(origin)
        //     return true
        // }catch (e){
        //     return false
        // }

    }
    moveDownCheck(){
        let origin={
            x:this.curr.origin.x,
            y:this.curr.origin.y,
        };
        origin.x++
        return this.blockToWrap(origin)

    }
    getDown(){
        let block=this.curr.block;
        //debugger
        block.forEach((i,ind)=>{
            i.forEach((k,knd)=>{
                if(k!==0){
                    block[ind][knd]=1
                }
            })
        })
        this.curr.block=block
        this.refView()
        //消除
        //let boundary=0
        this.container.forEach((i,ind)=>{
            if(i.every((k)=>k===1)){
                this.container[ind]=new Array(10).fill(0)
                this.fullClear(ind)
            }
        })
        //下轮开始
        this.curr=this.next;
        this.initNext()
        if(this.moveDownCheck()){
            this.initGame()
        }else{
            this.end()
        }

    }
    fullClear(boundary){
        for(let i=boundary;i>=0;i--){
            this.container[i].forEach((k,index)=>{
                if(k===1){
                    this.container[i][index]=0
                    this.container[i+1][index]=1
                }
            })
        }
    }
    down(){
        //debugger
        // if(this.moveCheck('x')==='stop'){
        //     this.getDown()
        //     return
        // }
        if(this.moveDownCheck()){
            this.reSetBlock()
            this.curr.origin.x++;
            this.refView()
        }else{
            this.getDown()
        }


    }
    right(){
        if(this.moveCheck('y+')){
            this.reSetBlock()
            this.curr.origin.y++;
            this.refView()
        }
    }
    left(){
        if(this.moveCheck('y-')){
            this.reSetBlock()
            this.curr.origin.y--;
            this.refView()
        }
    }
}
