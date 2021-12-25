using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class MotofyScoreAndMechanicRatingEntitiesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MechanicRatings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Score = table.Column<int>(nullable: false),
                    MechanicId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MechanicRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MechanicRatings_Mechanics_MechanicId",
                        column: x => x.MechanicId,
                        principalTable: "Mechanics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MechanicRatings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MotofyScores",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Score = table.Column<int>(nullable: false),
                    MotofyId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MotofyScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MotofyScores_Motofies_MotofyId",
                        column: x => x.MotofyId,
                        principalTable: "Motofies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MotofyScores_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MechanicRatings_MechanicId",
                table: "MechanicRatings",
                column: "MechanicId");

            migrationBuilder.CreateIndex(
                name: "IX_MechanicRatings_UserId",
                table: "MechanicRatings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MotofyScores_MotofyId",
                table: "MotofyScores",
                column: "MotofyId");

            migrationBuilder.CreateIndex(
                name: "IX_MotofyScores_UserId",
                table: "MotofyScores",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MechanicRatings");

            migrationBuilder.DropTable(
                name: "MotofyScores");
        }
    }
}
