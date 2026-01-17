//
//  FeedView.swift
//  briefly
//
//  Created by Mathias on 2026-01-15.
//

import SwiftUI

struct Article: Identifiable {
    let id = UUID()
    let number: Int
    let title: String
    let domain: String
    let points: Int
    let author: String
    let time: String
    let comments: Int
    let isHot: Bool
}

struct FeedView: View {
    @State private var selectedTab = "Top"
    let tabs = ["Top", "New", "Best", "Show", "Ask", "Jobs"]
    
    let articles: [Article] = [
        Article(number: 1, title: "Show HN: I built a minimal HN client", domain: "github.com", points: 452, author: "pg", time: "3h", comments: 124, isHot: false),
        Article(number: 2, title: "The End of 0% Interest Rates", domain: "wsj.com", points: 120, author: "econ_nerd", time: "5h", comments: 45, isHot: false),
        Article(number: 3, title: "Postgres 16 Released", domain: "postgresql.org", points: 890, author: "db_fan", time: "1h", comments: 230, isHot: true),
        Article(number: 4, title: "A unified theory of garbage collection", domain: "medium.com", points: 67, author: "compiler_guy", time: "6h", comments: 12, isHot: false),
        Article(number: 5, title: "Introducing the new CSS containment property", domain: "w3.org", points: 210, author: "web_wizard", time: "8h", comments: 56, isHot: false)
    ]
    
    var body: some View {
        VStack(spacing: 0) {
            // Header Section
            headerView
            
            // Navigation Tabs
            tabsView
            
            // Article List
            ScrollView {
                VStack(spacing: 0) {
                    ForEach(articles) { article in
                        articleRow(article: article)
                        Divider()
                    }
                    
                    // Load More Button
                    loadMoreButton
                    
                    // Footer
                    footerView
                }
            }
        }
        .background(Color.white)
    }
    
    var headerView: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 8) {
                    Text("BRIEFLY")
                        .font(.system(size: 16, weight: .bold, design: .monospaced))
                        .foregroundColor(.white)
                    Text("Hacker News")
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundColor(.white.opacity(0.7))
                }
                Text("TOP STORIES")
                    .font(.system(size: 10, design: .monospaced))
                    .foregroundColor(.white)
            }
            
            Spacer()
            
            // Refresh Icon
            Image(systemName: "arrow.clockwise")
                .foregroundColor(.white)
                .font(.system(size: 18))
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Color(red: 1.0, green: 0.4, blue: 0.0))
    }
    
    var tabsView: some View {
        HStack(spacing: 0) {
            ForEach(tabs, id: \.self) { tab in
                Button(action: {
                    selectedTab = tab
                }) {
                    Text(tab)
                        .font(.system(size: 14, weight: .medium, design: .monospaced))
                        .foregroundColor(selectedTab == tab ? .white : Color(red: 1.0, green: 0.4, blue: 0.0))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(selectedTab == tab ? Color(red: 1.0, green: 0.4, blue: 0.0) : Color.white)
                }
            }
        }
        .overlay(
            Rectangle()
                .frame(height: 1)
                .foregroundColor(Color(red: 1.0, green: 0.4, blue: 0.0)),
            alignment: .bottom
        )
    }
    
    func articleRow(article: Article) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: 4) {
            // Number
            Text("\(article.number)")
                .font(.system(size: 10, weight: .bold, design: .monospaced))
                .foregroundColor(Color(red: 1.0, green: 0.4, blue: 0.0))
                .frame(width: 12)
            
            // Article Content
            VStack(alignment: .leading, spacing: 6) {
                // Title
                Text(article.title)
                    .font(.system(size: 15, weight: .regular, design: .monospaced))
                    .foregroundColor(.black)
                    .lineLimit(2)
                
                // Domain
                Text("[\(article.domain)]")
                    .font(.system(size: 12, design: .monospaced))
                    .foregroundColor(.gray)
                
                // Metadata
                HStack {
                    Text("PTS: \(article.points)")
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundColor(.gray)
                    Text("BY: \(article.author)")
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundColor(.gray)
                    Text("TIME: \(article.time)")
                        .font(.system(size: 11, design: .monospaced))
                        .foregroundColor(.gray)
                    
                    Spacer()
                    
                    // Comments or Hot Icon
                    HStack(spacing: 4) {
                        if article.isHot {
                            Image(systemName: "flame.fill")
                                .font(.system(size: 12))
                                .foregroundColor(Color(red: 1.0, green: 0.4, blue: 0.0))
                        } else {
                            Image(systemName: "bubble.left")
                                .font(.system(size: 12))
                                .foregroundColor(.gray)
                        }
                        Text("\(article.comments)")
                            .font(.system(size: 11, design: .monospaced))
                            .foregroundColor(.gray)
                    }
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .frame(maxWidth: .infinity, alignment: .leading)
    }
    
    var loadMoreButton: some View {
        Button(action: {}) {
            Text("LOAD MORE DATA...")
                .font(.system(size: 14, weight: .medium, design: .monospaced))
                .foregroundColor(Color(red: 1.0, green: 0.4, blue: 0.0))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
                .overlay(
                    RoundedRectangle(cornerRadius: 4)
                        .stroke(Color(red: 1.0, green: 0.4, blue: 0.0), lineWidth: 1)
                )
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 16)
    }
    
    var footerView: some View {
        VStack(spacing: 4) {
            Rectangle()
                .fill(Color(red: 1.0, green: 0.4, blue: 0.0))
                .frame(width: 20, height: 20)
            Text("HACKER NEWS MOBILE CLI")
                .font(.system(size: 10, design: .monospaced))
                .foregroundColor(.gray)
        }
        .padding(.bottom, 20)
    }
}

#Preview {
    FeedView()
}
