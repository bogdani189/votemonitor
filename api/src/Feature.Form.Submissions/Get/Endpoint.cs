﻿namespace Feature.Form.Submissions.Get;

public class Endpoint(IReadRepository<FormSubmission> repository) : Endpoint<Request, Results<Ok<FormSubmissionModel>, NotFound>>
{
    public override void Configure()
    {
        Get("/api/election-rounds/{electionRoundId}/form-submissions");
        DontAutoTag();
        Options(x => x.WithTags("form-submissions", "mobile"));
        Summary(s =>
        {
            s.Summary = "Gets submission for a polling station";
        });
    }

    public override async Task<Results<Ok<FormSubmissionModel>, NotFound>> ExecuteAsync(Request req, CancellationToken ct)
    {
        var specification = new GetFormSubmissionSpecification(req.ElectionRoundId, req.PollingStationId, req.FormId, req.ObserverId);
        var pollingStationInformation = await repository.FirstOrDefaultAsync(specification, ct);

        if (pollingStationInformation is null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(FormSubmissionModel.FromEntity(pollingStationInformation));
    }
}
