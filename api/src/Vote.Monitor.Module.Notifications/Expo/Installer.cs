﻿using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Refit;
using Vote.Monitor.Module.Notifications.Contracts;

namespace Vote.Monitor.Module.Notifications.Expo;

internal static class Installer
{
    internal static IServiceCollection AddExpoNotificationSender(this IServiceCollection services, IConfiguration configuration)
    {
        var expoOptions = new ExpoOptions();
        configuration.Bind(expoOptions);

        services.AddSingleton(expoOptions);

        services.Configure<ExpoOptions>(configuration);
        services
            .AddRefitClient<IExpoApi>((sp) => new RefitSettings
            {
                ContentSerializer = new SystemTextJsonContentSerializer(new JsonSerializerOptions(JsonSerializerDefaults.Web)
                {
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
                })
            })
            .ConfigureHttpClient(c =>
            {
                c.BaseAddress = new Uri("https://exp.host/--/api/v2/push");

                if (!string.IsNullOrWhiteSpace(expoOptions.Token))
                {
                    c.DefaultRequestHeaders.Authorization = new("Bearer", expoOptions.Token);
                }
            });

        services.AddSingleton<IPushNotificationService, ExpoPushNotificationService>();

        return services;
    }
}
