package com.motoshop.securities;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtConfig jwtConfig, CustomUserDetailsService customUserDetailsService) {
        this.jwtConfig = jwtConfig;
        this.customUserDetailsService = customUserDetailsService;
    }

    public JwtAuthenticationFilter() {}

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // get JWT(token) from http request
        String token = this.getJWTFromRequest(request);

        // Check if logout endpoint is called
        if (request.getRequestURI().equals("/api/logout")) {
            if (StringUtils.hasText(token)) {
                jwtConfig.addToBlacklist(token); // Add token to the blacklist
            }
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // validate token
        if (StringUtils.hasText(token)) {
            try {
                if (jwtConfig.validateToken(token)) {
                    // get username from token
                    String username = jwtConfig.getUsernameFromJWT(token);

                    // load user associated with token
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // set spring security
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (Exception ex) {
                // Token không hợp lệ (sai chữ ký, hết hạn, ...) → trả về 401
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(
                    "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Token kh\\u00f4ng h\\u1ee3p l\\u1ec7 ho\\u1eb7c \\u0111\\u00e3 h\\u1ebft h\\u1ea1n. Vui l\\u00f2ng \\u0111\\u0103ng nh\\u1eadp l\\u1ea1i.\"}"
                );
                return;
            }
        }

        filterChain.doFilter(request, response);

    }

    //Bearer<accessToken>
    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
            return bearerToken.substring(7);
        }
        return null;
    }
}
