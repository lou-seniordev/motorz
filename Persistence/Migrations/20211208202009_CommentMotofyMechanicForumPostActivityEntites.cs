using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CommentMotofyMechanicForumPostActivityEntites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CommentActivity",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Body = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    AuthorId = table.Column<string>(nullable: true),
                    ActivityId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentActivity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentActivity_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CommentActivity_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CommentForumPosts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Body = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    AuthorId = table.Column<string>(nullable: true),
                    ForumpostId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentForumPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentForumPosts_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CommentForumPosts_Forumposts_ForumpostId",
                        column: x => x.ForumpostId,
                        principalTable: "Forumposts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CommentMechanics",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Body = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    AuthorId = table.Column<string>(nullable: true),
                    MechanicId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentMechanics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentMechanics_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CommentMechanics_Mechanics_MechanicId",
                        column: x => x.MechanicId,
                        principalTable: "Mechanics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CommentMotofies",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Body = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    AuthorId = table.Column<string>(nullable: true),
                    MotofyId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentMotofies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentMotofies_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CommentMotofies_Motofies_MotofyId",
                        column: x => x.MotofyId,
                        principalTable: "Motofies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentActivity_ActivityId",
                table: "CommentActivity",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentActivity_AuthorId",
                table: "CommentActivity",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentForumPosts_AuthorId",
                table: "CommentForumPosts",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentForumPosts_ForumpostId",
                table: "CommentForumPosts",
                column: "ForumpostId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentMechanics_AuthorId",
                table: "CommentMechanics",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentMechanics_MechanicId",
                table: "CommentMechanics",
                column: "MechanicId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentMotofies_AuthorId",
                table: "CommentMotofies",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentMotofies_MotofyId",
                table: "CommentMotofies",
                column: "MotofyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentActivity");

            migrationBuilder.DropTable(
                name: "CommentForumPosts");

            migrationBuilder.DropTable(
                name: "CommentMechanics");

            migrationBuilder.DropTable(
                name: "CommentMotofies");
        }
    }
}
