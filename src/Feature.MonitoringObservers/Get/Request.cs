﻿namespace Feature.MonitoringObservers.Get;

public class Request
{
    public Guid ElectionRoundId { get; set; }
    public Guid MonitoringNgoId { get; set; }
    public Guid Id { get; set; }
}
