const inputData = [
  {
    _id: {
      crmType: 'eLeads',
      syncType: 'extension',
      wasSuccess: true
    },
    count: 43.0
  },
  {
    _id: {
      crmType: 'eLeads',
      syncType: 'message',
      wasSuccess: true
    },
    count: 289.0
  },
  {
    _id: {
      crmType: 'eLeads',
      syncType: 'extension',
      wasSuccess: false
    },
    count: 4.0
  },
  {
    _id: {
      crmType: 'eLeads',
      syncType: 'message',
      wasSuccess: false
    },
    count: 100.0
  },
  {
    _id: {
      crmType: 'dealerPeak',
      syncType: 'message',
      wasSuccess: true
    },
    count: 81.0
  },
  {
    _id: {
      crmType: 'dealerPeak',
      syncType: 'message',
      wasSuccess: false
    },
    count: 1.0
  },
  {
    _id: {
      crmType: 'dealerSocket',
      syncType: 'message',
      wasSuccess: true
    },
    count: 96.0
  },
  {
    _id: {
      crmType: 'dealerSocket',
      syncType: 'scheduled',
      wasSuccess: false
    },
    count: 3759.0
  },
  {
    _id: {
      crmType: 'dealerSocket',
      syncType: 'scheduled',
      wasSuccess: true
    },
    count: 2108.0
  },
  {
    _id: {
      crmType: 'dealerSocket',
      syncType: 'message',
      wasSuccess: false
    },
    count: 64.0
  },
  {
    _id: {
      crmType: 'pbs',
      syncType: 'message',
      wasSuccess: true
    },
    count: 1.0
  },
  {
    _id: {
      crmType: 'pbs',
      syncType: 'message',
      wasSuccess: false
    },
    count: 1.0
  },
  {
    _id: {
      crmType: 'vinSolution',
      syncType: 'message',
      wasSuccess: true
    },
    count: 124.0
  },
  {
    _id: {
      crmType: 'vinSolution',
      syncType: 'message',
      wasSuccess: false
    },
    count: 6.0
  },
  {
    _id: {
      crmType: 'hubSpot',
      syncType: 'message',
      wasSuccess: false
    },
    count: 1.0
  },
  {
    _id: {
      crmType: 'hubSpot',
      syncType: 'message',
      wasSuccess: true
    },
    count: 1.0
  }
];

function createStatisticObject() {
  this.success = 0;
  this.failure = 0;
  this.successPercent = 0;
}

function statisticNormalizator(dataToNormilize) {
  // YOUR CODE HERE
  const statisticObject = dataToNormilize.reduce((acc, data) => {
    const {
      _id: { crmType, wasSuccess, syncType },
      count
    } = data;

    console.log(acc[crmType]);
    if (!acc[crmType] || !acc[crmType][syncType]) {
      acc[crmType] = {
        ...acc[crmType],
        [syncType]: {
          success: wasSuccess * count,
          failure: !wasSuccess * count,
          successPercent: wasSuccess * count
        }
      };
    } else {
      acc[crmType][syncType].success += wasSuccess * count;
      acc[crmType][syncType].failure += !wasSuccess * count;
      acc[crmType][syncType].successPercent =
        (acc[crmType][syncType].success /
          (acc[crmType][syncType].success + acc[crmType][syncType].failure)) *
        100;
    }

    return acc;
  }, {});

  return statisticObject;

  // RESPONSE EXAMPLE
  //   return {
  //     eLeads: {
  //       extension: { successPercent: 91.48936170212765, success: 43, failure: 4 },
  //       message: { successPercent: 74.293059125964, success: 289, failure: 100 }
  //     },
  //     dealerPeak: {
  //       message: { successPercent: 98.78048780487805, success: 81, failure: 1 }
  //     },
  //     dealerSocket: {
  //       message: { successPercent: 60, success: 96, failure: 64 },
  //       scheduled: {
  //         successPercent: 35.929776717231974,
  //         failure: 3759,
  //         success: 2108
  //       }
  //     },
  //     pbs: { message: { successPercent: 50, success: 1, failure: 1 } },
  //     vinSolution: {
  //       message: { successPercent: 95.38461538461539, success: 124, failure: 6 }
  //     },
  //     hubSpot: { message: { successPercent: 50, failure: 1, success: 1 } }
  //   };
}

console.log(statisticNormalizator(inputData));
