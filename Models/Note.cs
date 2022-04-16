namespace NotesAPP.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Desc { get; set; }
        public string? Created_at { get; set; }
        public bool Pinned { get; set; }
    }
}
