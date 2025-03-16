// import http from 'k6/http';
// import { check } from 'k6';  // Импортируем функцию check
//
// // k6 run api-test.ts
//
// export const options = {
//     stages: [
//         { duration: '10s', target: 30 },  // Медленный рост нагрузки
//         { duration: '10s', target: 300 }, // Основная нагрузка
//         { duration: '30s', target: 300 }, // Основная нагрузка
//         { duration: '10s', target: 0 }    // Плавное завершение
//     ],
//     httpTimeout: '30s', // Устанавливаем тайм-аут для всех HTTP запросов
//
// };
//
//
//
// export default () => {
//     // const dto = {
//     //     collabHash: "1e2971f6",
//     //     userId: 1
//     //
//     // };
//
//     // Преобразуем dto в строку JSON
//     // const payload = JSON.stringify(dto);
//
//     // Устанавливаем правильный заголовок
//     // const headers = {'Content-Type': 'application/json'};
//
//     const collab_join = "http://localhost:5000/messages/1e2971f6";
//
//     // Отправляем POST запрос
//     const res = http.get(collab_join);
//
//     // Проверка на статус 200 и время ответа
//     check(res, {
//         'status is 200': (r) => r.status === 200,
//         'response time < 500ms': (r) => r.timings.duration < 500,
//     });
//
// }