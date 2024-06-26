﻿using Feature.Form.Submissions.Services;

namespace Feature.Form.Submissions.Delete;

public class Endpoint(IRepository<FormSubmission> repository, IOrphanedDataCleanerService clearCleanerService) : Endpoint<Request, Results<NoContent, NotFound>>
{
    public override void Configure()
    {
        Delete("/api/election-rounds/{electionRoundId}/form-submissions");
        DontAutoTag();
        Options(x => x.WithTags("form-submissions", "mobile"));
        Summary(s =>
        {
            s.Summary = "Deletes a form submission for a polling station";
        });
    }

    public override async Task<Results<NoContent, NotFound>> ExecuteAsync(Request req, CancellationToken ct)
    {
        var specification = new GetFormSubmissionSpecification(req.ElectionRoundId, req.PollingStationId, req.FormId, req.ObserverId);
        var submission = await repository.FirstOrDefaultAsync(specification, ct);

        if (submission is null)
        {
            return TypedResults.NotFound();
        }

        await repository.DeleteAsync(submission, ct);
        await clearCleanerService.CleanupAsync(req.ElectionRoundId, submission.MonitoringObserverId,
            req.PollingStationId, req.FormId, ct);

        return TypedResults.NoContent();
    }
}
