const questionOrder = [
	{
		required: true,
		question_id: 1,
		subQuestions: [
			{
				required: true,
				parentQuestionValue: TRUE,
				question_id: 5,
				subQuestions: [
					{
						required: false,
						parentQuestionValue: FALSE,
						question_id: 14,
						subQuestions: [],
					},
					{
						required: false,
						parentQuestionValue: "Potato",
						question_id: 9,
						subQuestions: [],
					},
				],
			},
		],
	},
	{
		required: false,
		question_id: 20,
		subQuestions: [],
	},
];
