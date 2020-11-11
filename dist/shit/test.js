const newFreeTimes = [
    {
        city: "Haapsalu",
        newTimes: {
            time2: "27.01.2021 15:45",
            time3: "28.01.2021 15:45",
        },
    },
    {
        city: "Jõhvi",
        newTimes: {
            time1: "29.01.2021 15:45",
            time3: "11.02.2021 09:00",
        },
    },
    {
        city: "Jõhvi2",
        newTimes: {
            time1: "29.01.2021 15:45",
            time2: "30.01.2021 15:45",
        },
    },
    {
        city: "Jõhvi3",
        newTimes: {
            time1: "01.01.2021 15:45",
            time2: "02.01.2021 15:45",
        },
    },
];
let bigMessage = "";
newFreeTimes.forEach((el) => {
    let times = [el.newTimes.time1, el.newTimes.time2, el.newTimes.time3];
    let time1 = "", time2 = "", time3 = "";
    times.forEach((time) => {
        console.log(time);
    });
    if (el.newTimes.time1)
        time1 = el.newTimes.time1;
    if (el.newTimes.time2)
        time2 = el.newTimes.time2;
    if (el.newTimes.time3)
        time3 = el.newTimes.time3;
    let message = `${el.city}:
        ${time1}
        ${time2}
        ${time3}`;
    bigMessage += message;
    bigMessage += "\n";
});
//# sourceMappingURL=test.js.map