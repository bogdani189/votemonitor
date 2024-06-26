﻿using Bogus;
using SubmissionsFaker.Clients.Models.Questions;
using SubmissionsFaker.Clients.MonitoringObserver.Models;
using SubmissionsFaker.Clients.NgoAdmin.Models;
using SubmissionsFaker.Clients.PollingStations;
using SubmissionsFaker.Clients.Token;

namespace SubmissionsFaker.Fakers;

public sealed class SubmissionFaker : Faker<SubmissionRequest>
{
    public SubmissionFaker(List<UpdateFormResponse> forms, List<LocationNode> pollingStations, List<LoginResponse> observers)
    {
        RuleFor(x => x.PollingStationId, f => f.PickRandom(pollingStations).PollingStationId!);
        RuleFor(x => x.ObserverToken, f => f.PickRandom(observers).Token);

        Rules((f, x) =>
        {
            var form = f.PickRandom(forms);

            x.FormId = form.Id;
            x.Answers = form.Questions.Select(GetFakeAnswer).ToList();
        });
    }

    private BaseAnswerRequest GetFakeAnswer(BaseQuestionRequest question)
    {
        switch (question)
        {
            case TextQuestionRequest _:
                return new TextAnswerFaker(question.Id).Generate();

            case NumberQuestionRequest _:
                return new NumberAnswerFaker(question.Id).Generate();

            case DateQuestionRequest _:
                return new DateAnswerFaker(question.Id).Generate();

            case SingleSelectQuestionRequest singleSelectQuestionRequest:
                return new SingleSelectAnswerFaker(question.Id, singleSelectQuestionRequest.Options).Generate();

            case MultiSelectQuestionRequest multiSelectQuestionRequest:
                return new MultiSelectAnswerFaker(question.Id, multiSelectQuestionRequest.Options).Generate();

            case RatingQuestionRequest _:
                return new RatingAnswerFaker(question.Id).Generate();

            default: throw new ApplicationException("Unknown question type received");
        }
    }
}