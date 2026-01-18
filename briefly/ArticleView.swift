//
//  ArticleView.swift
//  briefly
//
//  Created by Mathias on 2026-01-15.
//

import SwiftUI

struct ArticleView: View {
    let article: Article
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ZStack {
            Color.white
                .ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Navigation Bar
                navigationBar
                
                ScrollView {
                    VStack(alignment: .leading, spacing: 16) {
                        // Article Title
                        Text(article.title)
                            .font(.system(size: 28, weight: .bold, design: .default))
                            .foregroundColor(.black)
                            .padding(.horizontal, 20)
                            .padding(.top, 8)
                        
                        // Source Information
                        HStack {
                            // Source Badge
                            HStack(spacing: 6) {
                                Text("MS")
                                    .font(.system(size: 10, weight: .semibold))
                                    .foregroundColor(.white)
                                Text("53 sources")
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.white)
                            }
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.blue)
                            .cornerRadius(4)
                            
                            Spacer()
                            
                            // Perplexity Logo
                            HStack(spacing: 4) {
                                Image(systemName: "snowflake")
                                    .font(.system(size: 14))
                                    .foregroundColor(.blue)
                                Text("perplexity")
                                    .font(.system(size: 12, weight: .medium))
                                    .foregroundColor(.blue)
                            }
                        }
                        .padding(.horizontal, 20)
                        
                        // Article Image
                        AsyncImage(url: URL(string: "https://picsum.photos/400/300?random=\(article.id.uuidString)")) { image in
                            image
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                        } placeholder: {
                            Rectangle()
                                .fill(Color.gray.opacity(0.3))
                                .overlay(
                                    ProgressView()
                                )
                        }
                        .frame(height: 250)
                        .clipped()
                        .padding(.horizontal, 20)
                        
                        // Article Body
                        VStack(alignment: .leading, spacing: 12) {
                            bulletPoint(text: "OpenAI will begin testing ads in ChatGPT for the first time, with sponsored content appearing at the bottom of responses for U.S. users on the free and $8/month Go tiers in the coming weeks.")
                            
                            bulletPoint(text: "The company projects advertising could generate $1 billion in 2026 as it faces mounting financial pressures, with expected revenue growth from enterprise customers.")
                        }
                        .padding(.horizontal, 20)
                        .padding(.bottom, 100) // Space for bottom input bar
                    }
                }
                
                // Bottom Input Bar
                bottomInputBar
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .toolbar(.hidden, for: .tabBar)
    }
    
    var navigationBar: some View {
        HStack {
            // Back Button
            Button(action: {
                dismiss()
            }) {
                Circle()
                    .fill(Color.white)
                    .frame(width: 36, height: 36)
                    .overlay(
                        Image(systemName: "arrow.left")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(.black)
                    )
            }
            
            Spacer()
            
            // Center Buttons
            HStack(spacing: 12) {
                // Headphones Button
                Circle()
                    .fill(Color.white)
                    .frame(width: 36, height: 36)
                    .overlay(
                        Image(systemName: "headphones")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.black)
                    )
                
                // Heart Button
                Circle()
                    .fill(Color.white)
                    .frame(width: 36, height: 36)
                    .overlay(
                        Image(systemName: "heart")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.black)
                    )
                
                // Share Button
                Circle()
                    .fill(Color.white)
                    .frame(width: 36, height: 36)
                    .overlay(
                        Image(systemName: "arrow.up")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.black)
                    )
            }
            
            Spacer()
            
            // More Options Button
            Circle()
                .fill(Color.white)
                .frame(width: 36, height: 36)
                .overlay(
                    Image(systemName: "ellipsis")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.black)
                )
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Color.white)
    }
    
    func bulletPoint(text: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Circle()
                .fill(Color.black)
                .frame(width: 6, height: 6)
                .padding(.top, 6)
            
            Text(text)
                .font(.system(size: 16, weight: .regular))
                .foregroundColor(.black)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
    
    var bottomInputBar: some View {
        HStack(spacing: 12) {
            // Input Field
            HStack {
                Text("Ask follow-up...")
                    .font(.system(size: 15))
                    .foregroundColor(.gray)
                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(Color.white)
            .cornerRadius(24)
            .overlay(
                RoundedRectangle(cornerRadius: 24)
                    .stroke(Color.gray.opacity(0.3), lineWidth: 1)
            )
            
            // Microphone Button
            Button(action: {}) {
                Circle()
                    .fill(Color.gray.opacity(0.1))
                    .frame(width: 40, height: 40)
                    .overlay(
                        Image(systemName: "mic.fill")
                            .font(.system(size: 16))
                            .foregroundColor(.black)
                    )
            }
            
            // Edit/New Button
            Button(action: {}) {
                Circle()
                    .fill(Color.gray.opacity(0.1))
                    .frame(width: 40, height: 40)
                    .overlay(
                        Image(systemName: "pencil")
                            .font(.system(size: 16))
                            .foregroundColor(.black)
                    )
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Color.white)
        .shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: -2)
    }
}

#Preview {
    NavigationStack {
        ArticleView(article: Article(number: 1, title: "OpenAI to test ads in ChatGPT for the first time", domain: "openai.com", points: 452, author: "openai", time: "3h", comments: 124, isHot: false))
    }
}
