// document.addEventListener('DOMContentLoaded', function() {
//   const el = document.getElementById('sliderBox');
//   if (el !== null) el.style.cursor = 'grab';
//   let pos = { top: 0, left: 0, x: 0, y: 0 };

//   const mouseDownHandler = function (e: any) {
//     if (el !== null) el.style.cursor = 'grabbing';
//     if (el !== null) el.style.userSelect = 'none';
//     if (el !== null) {
//       pos = {
//         left: el.scrollLeft,
//         top: el.scrollTop,
//         x: e.clientX,
//         y: e.clientY,
//       }
//     }
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
//   };

//   const mouseMoveHandler = function (e: any) { // HOW MUCH MOUSE HAS MOVED
//     const dx = e.clientX - pos.x;
//     const dy = e.clientY - pos.y;
//     if (el !== null) el.scrollTop = pos.top - dy;
//     if (el !== null) el.scrollLeft = pos.left - dx;
//   };

//   const mouseUpHandler = function () {
//     if (el !== null) el.style.cursor = 'grab';
//     if (el !== null) el.style.removeProperty('user-select');
//     document.removeEventListener('mousemove', mouseMoveHandler);
//     document.removeEventListener('mouseup', mouseUpHandler);
//   };

//   if (el !== null) el.addEventListener('mousedown', mouseDownHandler);
// })