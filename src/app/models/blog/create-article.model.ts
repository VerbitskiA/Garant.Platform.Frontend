export interface CreateArticleModel {
  articleId: number;
  blogId: number;
  previewUrl?: string;
  articleUrl?: string;
  title?: string;
  description?: string;
  text?: string;
  position: number;
  dateCreated: string;
  articleCode?: string;
  themeCode?: string;
  signatureText?: string;
}
