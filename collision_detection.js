function pointCollisionTriangle(pointVector, gameObject) {
  var tArea = triangleArea(gameObject.firstPoint, gameObject.secondPoint, gameObject.front)
  var area1 = triangleArea(pointVector, gameObject.firstPoint, gameObject.front)
  var area2 = triangleArea(pointVector, gameObject.firstPoint, gameObject.secondPoint)
  var area3 = triangleArea(pointVector, gameObject.secondPoint, gameObject.front)

  return (Math.abs(area1 + area2 + area3) == Math.abs(tArea))
}

function triangleArea(vector1, vector2, vector3) {
  var a = vector1.x - vector3.x
  var b = vector1.y - vector3.y
  var c = vector2.x - vector3.x
  var d = vector2.y - vector3.y

  return (0.5 * Math.abs((a * d) - (b * c)))
}

function pointCollisionCircle(circlePos, gameObject, dia) {
  var d1 = dist(circlePos.x, circlePos.y, gameObject.front.x, gameObject.front.y)
  var d2 = dist(circlePos.x, circlePos.y, gameObject.firstPoint.x, gameObject.firstPoint.y)
  var d3 = dist(circlePos.x, circlePos.y, gameObject.secondPoint.x, gameObject.secondPoint.y)
  var d4 = dist(circlePos.x, circlePos.y, gameObject.middlePoint.x, gameObject.middlePoint.y)
  var d5 = dist(circlePos.x, circlePos.y, gameObject.topSideMid.x, gameObject.topSideMid.y)
  var d6 = dist(circlePos.x, circlePos.y, gameObject.bottomSideMid.x, gameObject.bottomSideMid.y)

  return (d1 < dia / 2 || d2 < dia / 2 || d3 < dia / 2 || d4 < dia / 2 || d5 < dia / 2 || d6 < dia / 2)
}
