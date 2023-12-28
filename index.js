// Event listener that waits until the DOM loads to proceed?
// Not sure that's needed - what's in index.html? We can add in after if needed.

// Global Variables
let employeeObj = {};
let employeeArray = [];

// Function 1: Create Employee Record - takes an argument that is an array with basic information about the employee. Returns javacript object with keys laid out in lab.
function createEmployeeRecord(employeeRecord) {
    const employeeObj = {};
    employeeObj.firstName = employeeRecord[0];
    employeeObj.familyName = employeeRecord[1];
    employeeObj.title = employeeRecord[2];
    employeeObj.payPerHour = employeeRecord[3];
    employeeObj.timeInEvents = [];
    employeeObj.timeOutEvents = [];
    return employeeObj;
}

// Function 2: Create Employee Record(s)
function createEmployeeRecords(employeeRecords) {
    // Passes through each array in employeeRecords
    employeeArray = employeeRecords.map(createEmployeeRecord);
    console.log(employeeArray)
    return employeeArray;
}

// Function 3: Create Time In Event
function createTimeInEvent(employeeRecordObj, dateStamp) {
    const hour = parseInt(dateStamp.slice(11, 15), 10);
    const date = dateStamp.slice(0, 10);
    const timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date,
    }

    employeeRecordObj.timeInEvents.push(timeInEvent);

    return employeeRecordObj;

}

// Function 4: Create Time Out Event
function createTimeOutEvent(employeeRecordObj, dateStamp) {
    const hour = parseInt(dateStamp.slice(11, 15), 10);
    const date = dateStamp.slice(0, 10);
    const timeOutEvent = {
        type: "TimeOut",
        hour: hour,
        date: date,
    }

    employeeRecordObj.timeOutEvents.push(timeOutEvent);

    return employeeRecordObj;

}

// Function 5: Hours Worked On Date
function hoursWorkedOnDate(employeeRecordObj, date) {
    let timeIn;
    let timeOut;
    employeeRecordObj.timeInEvents.forEach((record) => {
        if (record.date === date) {
            timeIn = record.hour;
        }
    })
    employeeRecordObj.timeOutEvents.forEach((record) => {
        if (record.date === date) {
            timeOut = record.hour
        }
    })
    let hoursWorked = (timeOut - timeIn) / 100;
    return hoursWorked;
}

// Function 6: Wages Earned On Date
function wagesEarnedOnDate(employeeRecordObj, date) {
    return hoursWorkedOnDate(employeeRecordObj, date) * employeeRecordObj.payPerHour;
}

// Function 7: All Wages For
function allWagesFor(employeeRecordObj) {
    const workedDates = employeeRecordObj.timeInEvents.map((record) => record.date)
    let totalWages = 0;
    for (const date of workedDates) {
        const wagesForDate = wagesEarnedOnDate(employeeRecordObj, date);
        totalWages += wagesForDate;
    }

    return totalWages;
}

// Function 8: Calculate Payroll
function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    for (const employeeRecord of employeeRecords) {
        const wagesForEmployee = allWagesFor(employeeRecord);
        totalPayroll += wagesForEmployee;
    }

    return totalPayroll;
}


