using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddPrivateMessagesAndThreadEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PrivateMessageThreads",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    InitUsername = table.Column<string>(nullable: true),
                    ReceiverUsername = table.Column<string>(nullable: true),
                    InitDeleted = table.Column<bool>(nullable: false),
                    ReceiverDeleted = table.Column<bool>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateMessageThreads", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PrivateMessages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SenderId = table.Column<string>(nullable: true),
                    SenderUsername = table.Column<string>(nullable: true),
                    RecipientId = table.Column<string>(nullable: true),
                    RecipientUsername = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    DateRead = table.Column<DateTime>(nullable: true),
                    DateSent = table.Column<DateTime>(nullable: false),
                    SenderDeleted = table.Column<bool>(nullable: false),
                    RecipientDeleted = table.Column<bool>(nullable: false),
                    PrivateMessageThreadId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PrivateMessages_PrivateMessageThreads_PrivateMessageThreadId",
                        column: x => x.PrivateMessageThreadId,
                        principalTable: "PrivateMessageThreads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrivateMessages_AspNetUsers_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrivateMessages_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_PrivateMessageThreadId",
                table: "PrivateMessages",
                column: "PrivateMessageThreadId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_RecipientId",
                table: "PrivateMessages",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_SenderId",
                table: "PrivateMessages",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrivateMessages");

            migrationBuilder.DropTable(
                name: "PrivateMessageThreads");
        }
    }
}
