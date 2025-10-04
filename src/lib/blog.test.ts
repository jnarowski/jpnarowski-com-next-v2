import { describe, it, expect } from 'vitest'
import { getAllArticles, getArticleBySlug } from './blog'

describe('Blog utilities', () => {
  describe('getAllArticles', () => {
    it('should return an array of articles', () => {
      const articles = getAllArticles()
      expect(Array.isArray(articles)).toBe(true)
    })

    it('should only return published articles', () => {
      const articles = getAllArticles()
      articles.forEach(article => {
        expect(article.published).toBe(true)
      })
    })

    it('should sort articles by date (newest first)', () => {
      const articles = getAllArticles()
      if (articles.length > 1) {
        for (let i = 0; i < articles.length - 1; i++) {
          const currentDate = new Date(articles[i].date)
          const nextDate = new Date(articles[i + 1].date)
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime())
        }
      }
    })

    it('should include required article properties', () => {
      const articles = getAllArticles()
      if (articles.length > 0) {
        const article = articles[0]
        expect(article).toHaveProperty('title')
        expect(article).toHaveProperty('description')
        expect(article).toHaveProperty('date')
        expect(article).toHaveProperty('slug')
        expect(article).toHaveProperty('tags')
        expect(article).toHaveProperty('readingTime')
      }
    })
  })

  describe('getArticleBySlug', () => {
    it('should return an article with content when given a valid slug', () => {
      const articles = getAllArticles()
      if (articles.length > 0) {
        const slug = articles[0].slug
        const article = getArticleBySlug(slug)

        expect(article).toBeDefined()
        expect(article?.slug).toBe(slug)
        expect(article?.content).toBeDefined()
        expect(typeof article?.content).toBe('string')
      }
    })

    it('should return null for non-existent slug', () => {
      const article = getArticleBySlug('non-existent-article-slug-12345')
      expect(article).toBeNull()
    })
  })
})
