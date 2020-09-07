# SubApplication

### A javascript library for building simple web applications

The library is only **58 lines** of code, inspired by Cell.js & React.js. There are only subapplications in the paradigm and connect them only with event bus. There is no VDOM, but takes lifecycles & singly existing components.

When ```mount``` is called, it start selecting real DOM and save for later use, It will cause ```CPU saving```. Then I build ```definedDOM Type```. Since js is not static, you will see disadvantage of lacking ```type safety```. Then I ```attach events``` during build real dom. 

When a property is updated, real dom is rebuilt if the value are not same as previouse data value. 


Don't take serious, I made this for learning purpose.
Here is some sample code. Have some fun.
```html
<body>
    <div id="button"></div>


    <script src="subapplication.js"></script>
    <script>
        class Button extends SubApplication{
            constructor(){
                super({text:"Button is Clicked 0 times",counter:0});
            }

            sayHello(){
                console.log("Mouse Move");   
            }

            createUI(data){
                return {
                    type:"button",
                    value:`Button is Clicked ${data.counter} times`,
                    on:{
                        click:()=>{
                            this.set("counter",data.counter+1);
                        },
                        mousemove:this.sayHello,
                    }
                }
            }
        }

        SubApplication.mount("#button",new Button());
    </script>
</body>
```
