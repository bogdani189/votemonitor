﻿using Microsoft.EntityFrameworkCore.Migrations;
using Vote.Monitor.Domain.Constants;

#nullable disable

namespace Vote.Monitor.Domain.Migrations
{
    /// <inheritdoc />
    public partial class AddArrayDiffFunction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(CustomDBFunctions.CreateArrayDiff);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@$"DROP FUNCTION IF EXISTS ""{CustomDBFunctions.ArrayDiff}"";");
        }
    }
}
