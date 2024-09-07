
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
    try {
        O = findIntersectionPoint(A, r1, B, r2, C, r3)

        $('#Ox').text(`x: ${O.x}`)
        $('#Oy').text(`y: ${O.y}`)

    } catch (e) {
        alert(e)

        $('#Ox').text(`x: `)
        $('#Oy').text(`y: `)
    }

    // drawResults(A, r1, B, r2, C, r3, O)
}

/*

const width = 1000
const height = 500

let canvas = $('#canvas')[0]

class CanvasCoordinatePlane {
    constructor(canvas, minX, maxX, minY, maxY) {
        this.ctx = canvas.getContext("2d")

        this.minX = minX
        this.maxX = maxX
        this.minY = minY
        this.maxY = maxY

        let xScale = width / (maxX - minX)
        let yScale = height / (maxY - minY)

        this.scale = (xScale <= yScale) ? xScale : yScale

        for (var x = this.minX; x < this.maxX; x++) {
            this.ctx.moveTo(x * this.scale, 0)
            this.ctx.lineTo(x * this.scale, maxY * this.scale)
            this.ctx.stroke()
        }

        for (var y = this.minY; y < this.maxY; y++) {
            this.ctx.moveTo(0, y * this.scale)
            this.ctx.lineTo(maxX * this.scale, y * this.scale)
            this.ctx.stroke()
        }
    }

    drawCircle(C, r) {
        this.ctx.beginPath()
        this.ctx.arc(C.x * this.scale, C.y  * this.scale, r  * this.scale, 0, 2 * Math.PI)
        this.ctx.stroke()
    }
}

function drawResults(A, r1, B, r2, C, r3, O) {

    let minX = Math.min(A.x, B.x, C.x) * 1.2
    let maxX = Math.max(A.x, B.x, C.x) * 1.2
    let minY = Math.min(A.y, B.y, C.y) * 1.2
    let maxY = Math.max(A.y, B.y, C.y) * 1.2

    let graph = new CanvasCoordinatePlane(canvas, minX, maxX, minY, maxY)
    
    graph.drawCircle(A, r1)
    graph.drawCircle(B, r2)
    graph.drawCircle(C, r3)
}

*/