/*规则
少于2个邻居的点，在下一回合死去。模拟生命较少的情况。
在周围邻居数量是2和3时，下一回合保持不变
在周围邻居数量大于3时，下一回合死去，模拟生命拥挤的情况。
当一个空白的点，周围的邻居数量是3个时， 下一回合将会产生一个新的点。模拟繁殖。
*/
let temporaryArray = [];
let lifeCounts = '5000';//初始化随机的生命数量
let lifeColor = '#D8D8D8';
let lifeWidth = 5; //单个生命的长宽相同
let lifeStatusArray = []; //二维数组，所有生命的状态,false空，true存活
for (let i = 0; i < 100; i++) {     //二维数组初始化
    lifeStatusArray[i] = [];
    for (let j = 0; j < 100; j++) {
        lifeStatusArray[i][j] = false;
    }
}
let c = document.getElementById("Canvas");
let ctx = c.getContext("2d");
//ctx.fillStyle='color';
//ctx.fillRect(0,0,5,5); (X,Y,宽,高)

function traverseArray(array) {
    //console.log(array);
    let n = array.length; //遍历数组并调用绘画函数画出所有生命
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            print(i, j, array[i][j]);
        }
    }
}

function print(x, y, status) {   //绘画函数   x，y,数组中的位置。status，存活状态
    let locationX = (x * 5) + (x * 1); //locationX Canvas绘图中的实际x坐标
    let locationY = (y * 5) + (y * 1); //locationY Canvas绘图中的实际y坐标
    lifeColor = status ? '#588F11' : '#D8D8D8';  //根据生命存活状态判断颜色
    ctx.fillStyle = lifeColor;
    ctx.fillRect(locationX, locationY, lifeWidth, lifeWidth);
    //console.log('画'+locationX+locationY);
}

function randomInitialization(lifeCounts) {  //随机初始化
    for (let i = 0; i < lifeCounts; i++) {
        let a = Math.floor(Math.random() * 100);
        let b = Math.floor(Math.random() * 100); //随机生成两个数字
        lifeStatusArray[a][b] = true;
        print(a, b, lifeStatusArray[a][b])
        //console.log(i)
    }
}

function checkNeighborCounts(array, i, j) {
    let counts = 0;
    
    //左上角邻居

    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i - 1][j - 1]) {
        counts++;
        //console.log(i,j,1,counts);
    }
    //上方邻居
    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i][j - 1]) {
        counts++;
        //console.log(i,j,2,counts);
    }
    //右上邻居
    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i + 1][j - 1]) {
        counts++;
        //console.log(i,j,3,counts);
    }
    //右边邻居
    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i + 1][j]) {
        counts++;
        //console.log(i,j,4,counts);
    }
    //右下邻居
    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i + 1][j + 1]) {
        counts++;
        //console.log(i,j,5,counts);
    }
    //下面邻居
    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i][j + 1]) {
        counts++;
        //console.log(i,j,6,counts);
    }
    //左下邻居
    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i - 1][j + 1]) {
        counts++;
        //console.log(i,j,7,counts);
    }
    //左边邻居
    if ((i - 1) > -1 && (j - 1) > -1 && (i + 1) < 100 && (j + 1) < 100 && array[i - 1][j]) {
        counts++;
        //console.log(i,j,8,counts);
    }
    //console.log(counts);
    return counts;
}
function checkStatus(array) {  //判断生命状态，根据规则更改状态
    let neighbor = 0;
    for (let i = 0; i < 100; i++) {     //二维数组初始化
        for (let j = 0; j < 100; j++) {
            neighbor = checkNeighborCounts(lifeStatusArray, i, j);
            if (neighbor < 2) {
                array[i][j] = false;
            } else if (neighbor == 3) {
                array[i][j] = true;
            } else if (neighbor > 3) {
                array[i][j] = false;
            }
            //else(console.log(neighbor))
            //console.log(neighbor)
            

        }
        
        //console.log(i,neighbor)
    }
    return array;

}

function deepCopy(array) {
    let n = array.length;
    let tArray = [];
    for (let i = 0; i < n; i++) {
        tArray[i] = array[i].concat();
    }
    return tArray;
}

function ccc(array) {  //测试用，计算true数量
    let a = 0;
    for (let i = 0; i < 100; i++) {     //二维数组初始化
        for (let j = 0; j < 100; j++) {
            if (array[i][j] == true) {
                a++;
            };
        }
    }
    return a;
}
function main() {
    //初始化绘图
    temporaryArray = deepCopy(lifeStatusArray);
    checkStatus(temporaryArray);
    lifeStatusArray = deepCopy(temporaryArray);
    traverseArray(lifeStatusArray);
    //console.log(3)

}

function loop() {
    setInterval(function(){main()},1);
}
traverseArray(lifeStatusArray)