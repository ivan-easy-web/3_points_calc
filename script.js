
function calcDistance(A, B) {
    return Math.sqrt((A.x - B.x)**2 + (A.y - B.y)**2)
}

function findIntersectionPoint (A, r1, B, r2, C, r3) {
    let d = calcDistance(A, B)
    
    if (d == 0) {
        throw new Error("Неверные координаты. Точки A и B - одна и та же точка.")
    } else if (d > (r1 + r2)) {
        throw new Error("Неверные координаты. Точки A и B слишком далеко друг от друга.")
    } else if (d < Math.abs(r1 - r2)) {
        throw new Error("Неверные координаты. Точки A и B слишком близко друг к другу.")
    } 

    let a = d - (r2**2 - r1**2 + d**2) / (2 * d)

    let H = {}
    H.x = A.x + (a / d) * (B.x - A.x)
    H.y = A.y + (a / d) * (B.y - A.y)

    let h = Math.sqrt(r1**2 - a**2)

    let O1 = {}
    O1.x = H.x + h * (B.y - A.y) / d
    O1.y = H.y - h * (B.x - A.x) / d

    if (calcDistance(O1, C) == r3) {
        return O1
    } else {
        let O2 = {}
        O2.x = H.x - h * (B.y - A.y) / d
        O2.y = H.y + h * (B.x - A.x) / d

        if (calcDistance(O2, C) == r3) {
            return O2
        } else {
            throw new Error("Неверные координаты. Окружность C не проходит ни через одно пересечение окружностей A и B.")
        }
    }
}

function defaultButtonClick() {
    let A = {x: 0, y: 5}
    let r1 = 4

    let B = {x: 4, y: 8}
    let r2 = 3

    let C = {x: 4, y: 0 }
    let r3 = 5

    $('#Ax').val(A.x)
    $('#Ay').val(A.y)
    $('#r1').val(r1)

    $('#Bx').val(B.x)
    $('#By').val(B.y)
    $('#r2').val(r2)

    $('#Cx').val(C.x)
    $('#Cy').val(C.y)
    $('#r3').val(r3)
}

function calcButtonClick() {
    let A = {
        x: parseFloat($('#Ax').val()), 
        y: parseFloat($('#Ay').val())
    }
    let r1 = parseFloat($('#r1').val())

    let B = {
        x: parseFloat($('#Bx').val()), 
        y: parseFloat($('#By').val())
    }
    let r2 = parseFloat($('#r2').val())

    let C = {
        x: parseFloat($('#Cx').val()), 
        y: parseFloat($('#Cy').val())
    }
    let r3 = parseFloat($('#r3').val())

    let O
    var success = true
    try {
        O = findIntersectionPoint(A, r1, B, r2, C, r3)

        $('#Ox').text(`x: ${O.x}`)
        $('#Oy').text(`y: ${O.y}`)

    } catch (e) {
        alert(e)
        success = false

        $('#Ox').text(`x: `)
        $('#Oy').text(`y: `)
    }

    drawResults(A, r1, B, r2, C, r3, O, success)
}

function drawResults(A, r1, B, r2, C, r3, O, success = true) {
    graph.clear()

    graph.drawCircle(A, r1, 'A')
    graph.drawCircle(B, r2, 'B')
    graph.drawCircle(C, r3, 'C')

    if (success) {
        graph.drawPoint(O, 'O')
        
        graph.drawLine(A, O, r1)
        graph.drawLine(B, O, r2)
        graph.drawLine(C, O, r3)
    }
}


const width = 1000
const height = 500
const step = 25

class Graph {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d")
    }

    drawGrid() {
        this.ctx.moveTo(500, 0)
        this.ctx.lineTo(500, 500)

        this.ctx.moveTo(0, 250);
        this.ctx.lineTo(1000, 250)

        for (var x = 0; x <= width; x += step) {
            this.ctx.moveTo(x, 240)
            this.ctx.lineTo(x, 260)
        }

        for (var y = 0; y <= height; y += step) {
            this.ctx.moveTo(490, y)
            this.ctx.lineTo(510, y)
        }

        this.ctx.stroke()
    }

    clear() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawGrid()
    }

    translatePoint(P) {
        return {
            x: P.x * step + 500,
            y: - P.y * step + 250
        }
    }

    drawPoint(P, name = '') {
        let C = this.translatePoint(P)

        this.ctx.beginPath();
        this.ctx.arc(C.x, C.y, 3, 0, 2 * Math.PI)
        this.ctx.fill()

        this.ctx.font = "20px Arial";
        this.ctx.fillText(name, C.x + 5, C.y - 5)
    }

    drawCircle(P, r, name = '') {
        let C = this.translatePoint(P)

        this.ctx.beginPath();
        this.ctx.arc(C.x, C.y, r * step, 0, 2 * Math.PI)
        this.ctx.stroke()

        this.drawPoint(P, name)
    }

    drawLine(A, B, r = '') {
        let tA = this.translatePoint(A)
        let tB = this.translatePoint(B)

        this.ctx.moveTo(tA.x, tA.y)
        this.ctx.lineTo(tB.x, tB.y)
        this.ctx.stroke()

        this.ctx.fillText(r, (tA.x + tB.x) / 2 + 5, (tA.y + tB.y) / 2 - 5)
    }
}

let canvas = $('#canvas')[0]
let graph = new Graph(canvas)


